require("dotenv").config();
const path = require("path");
const fs = require("fs").promises;
const shortHash = require("short-hash");
const fastglob = require("fast-glob");
const PerfLeaderboard = require("performance-leaderboard");

const NUMBER_OF_RUNS = 3;
const FREQUENCY = 60; // in minutes
const NETLIFY_MAX_LIMIT = 15; // in minutes, netlify limit
const ESTIMATED_MAX_TIME_PER_TEST = 0.75; // in minutes, estimate based on looking at past builds

const prettyTime = (seconds) => {
	// Based on https://johnresig.com/blog/javascript-pretty-date/
	const days = Math.floor(seconds / (60*60*24));

	return (
		(days === 0 &&
			((seconds < 60 && "just now") ||
				(seconds < 60 * 2 && "1 minute ago") ||
				(seconds < 3600 && Math.floor(seconds / 60) + " minutes ago") ||
				(seconds < 7200 && "1 hour ago") ||
				(seconds < 86400 * 2 && Math.floor(seconds / 3600) + " hours ago"))) ||
		(days < 7 && days + " days ago") ||
		(Math.ceil(days / 7) + " weeks ago")
	);
}

async function tryToPreventNetlifyBuildTimeout(dateTestsStarted, numberOfUrls, estimatedTimePerBuild = ESTIMATED_MAX_TIME_PER_TEST) {
	let minutesRemaining = NETLIFY_MAX_LIMIT - (Date.now() - dateTestsStarted)/(1000*60);
	if(process.env.CONTEXT &&
		process.env.CONTEXT === "production" &&
		NETLIFY_MAX_LIMIT &&
		minutesRemaining < numberOfUrls * estimatedTimePerBuild) {
		console.log( `run-tests has about ${minutesRemaining} minutes left, but the next run has ${numberOfUrls} urls. Saving it for the next build.` );
		return true;
	}
	return false;
}

(async function() {
	// Netlify specific check (works fine without this env variable too)
	if(process.env.CONTEXT && process.env.CONTEXT !== "production") {
		console.log( "Skipping all test runs because we’re in a Netlify build or deploy preview!" );
		return;
	}

	let dateTestsStarted = Date.now();
	let dataDir = `./_data/`;
	// Careful here, this filename needs to be .gitignore’d and
	// listed in the keep-data-cache plugin.
	let lastRunsFilename = `${dataDir}results-last-runs.json`;
	let lastRuns;
	try {
		lastRuns = require(lastRunsFilename);
		console.log( "Last runs at start: ", JSON.stringify(lastRuns) );
	} catch (e) {
		console.log(`There are no known last run timestamps`);
		lastRuns = {};
	}

	let verticals = await fastglob("./_data/sites/*.js", {
		caseSensitiveMatch: false
	});

	for(let file of verticals) {
		let group = require(file);
		if(typeof group === "function") {
			group = await group();
		}
		let key = file.split("/").pop().replace(/\.js$/, "");

		if(group.skip) {
			console.log( `Skipping ${key} (you told me to in your site config)` );
			continue;
		}

		// TODO maybe skip this step if it’s the first build?
		if(await tryToPreventNetlifyBuildTimeout(dateTestsStarted, group.urls.length, group.estimatedTimePerBuild)) {
			// stop everything, we’re too close to the timeout
			return;
		}

		let runFrequency =
			group.options && group.options.frequency
				? group.options.frequency
				: FREQUENCY;

		if (!lastRuns[key]) {
			console.log(`First tests for ${key}.`);
		} else {
			const lastRun = lastRuns[key];
			const lastRunSecondsAgo = (dateTestsStarted - lastRun.timestamp) / 1000;
			const lastRunSecondsAgoPretty = prettyTime(lastRunSecondsAgo);
			const lastRunMinutesAgo = lastRunSecondsAgo / 60;
			if (lastRunMinutesAgo < runFrequency) {
				console.log(
					`Previous test for ${key} ran ${lastRunSecondsAgoPretty}, less than ${runFrequency} minutes, skipping.`
				);
				continue;
			} else {
				console.log(`Previous test for ${key} ran ${lastRunSecondsAgoPretty}, more than ${runFrequency} minutes, running.`);

			}
		}

		let runCount =
			group.options && group.options.runs ? group.options.runs : NUMBER_OF_RUNS;
		let options = Object.assign({
			chromeFlags: ['--headless', '--disable-dev-shm-usage']
		}, group.options);

		let results = await PerfLeaderboard(
			group.urls,
			runCount,
			options,
		);

		let promises = [];
		for(let result of results) {
			let id = shortHash(result.url);
			let isIsolated = group.options && group.options.isolated;
			let dir = `${dataDir}results/${isIsolated ? `${key}/` : ""}${id}/`;

			let filename = `${dir}date-${dateTestsStarted}.json`;
			await fs.mkdir(dir, { recursive: true });
			promises.push(fs.writeFile(filename, JSON.stringify(result, null, 2)));
			console.log( `Writing ${filename}.` );
		}

		await Promise.all(promises);
		lastRuns[key] = { timestamp: Date.now() };
		console.log( `Finished testing "${key}".` );

		// Write the last run time to avoid re-runs
		await fs.writeFile(lastRunsFilename, JSON.stringify(lastRuns, null, 2));
		console.log( `Last runs after "${key}":`, JSON.stringify(lastRuns) );
	}
})();
