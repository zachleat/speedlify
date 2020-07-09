require("dotenv").config();
const fs = require("fs").promises;
const shortHash = require("short-hash");
const fetch = require("node-fetch");
const fastglob = require("fast-glob");
const PerfLeaderboard = require("performance-leaderboard");

const NUMBER_OF_RUNS = 3;
const FREQUENCY = 60; // in minutes
const BUILD_HOOK_TRIGGER_URL = process.env.BUILD_HOOK_TRIGGER_URL;
const TESTS_MAX_TIME = 8; // in minutes, 0 is no limit

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

async function maybeTriggerAnotherNetlifyBuild(dateTestsStarted) {
	// Use build hook to trigger another build if we’re nearing the 15 minute limit
	if(process.env.CONTEXT &&
		process.env.CONTEXT === "production" &&
		TESTS_MAX_TIME &&
		(Date.now() - dateTestsStarted)/(1000*60) > TESTS_MAX_TIME) {
		console.log( `run-tests has been running for longer than ${TESTS_MAX_TIME} minutes, saving future test runs for the next build.` );
		if(BUILD_HOOK_TRIGGER_URL) {
			console.log( "Trying to trigger another build using a build hook." );
			let res = await fetch(BUILD_HOOK_TRIGGER_URL, { method: 'POST', body: '{}' })
			console.log( await res.text() );
		}
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
	} catch (e) {
		console.log(`There are no known last run timestamps`);
		lastRuns = {};
	}

	let verticals = await fastglob("./_data/sites/*.js", {
		caseSensitiveMatch: false
	});
	for(let file of verticals) {
		let group = require(file);
		let key = file.split("/").pop().replace(/\.js$/, "");

		if(await maybeTriggerAnotherNetlifyBuild(dateTestsStarted)) {
			break;
		}

		if(group.skip) {
			console.log( `Skipping ${key} (you told me to in your site config)` );
			continue;
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
		let results = await PerfLeaderboard(
			group.urls,
			runCount,
			group.options || {}
		);

		let promises = [];
		for(let result of results) {
			let id = shortHash(result.url);
			let dir = `${dataDir}results/${id}/`;
			let filename = `${dir}date-${dateTestsStarted}.json`;
			await fs.mkdir(dir, { recursive: true });
			promises.push(fs.writeFile(filename, JSON.stringify(result, null, 2)));
			console.log( `Writing ${filename}.` );
		}

		await Promise.all(promises);
		lastRuns[key] = { timestamp: Date.now() };
		console.log( `Finished testing "${key}".` );
	}

	// Write the last run time to avoid re-runs
	await fs.writeFile(lastRunsFilename, JSON.stringify(lastRuns, null, 2));
})();
