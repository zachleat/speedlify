const fs = require("fs").promises;
const shortHash = require("short-hash");
const PerfLeaderboard = require("performance-leaderboard");

const NUMBER_OF_RUNS = 3;
const FREQUENCY = 60;

(async function() {
	let today = Date.now();
	let dataDir = `./_data/`;
	let lastRunsFilename = `${dataDir}results-last-run.json`;
	let lastRuns;
	try {
		lastRuns = require(lastRunsFilename);
	} catch (e) {
		console.log(`There are no known last run timestamps`);
		lastRuns = {};
	}

	let groups = require("./_data/sites.js");
	for (let key in groups) {
		let group = groups[key];
		let runFrequency =
			group.options && group.options.frequency
				? group.options.frequency
				: FREQUENCY;
		if (!lastRuns[key]) {
			console.log(`First tests for ${key}.`);
		} else {
			const lastRun = lastRuns[key];
			const lastRunMinutesAgo = (today - lastRun.timestamp) / (1000 * 60);
			console.log(
				`Tests for ${key} ran ${lastRunMinutesAgo} minutes ago.`,
				lastRun
			);
			if (lastRunMinutesAgo < runFrequency) {
				console.log(
					`Test ran less than ${runFrequency} minutes ago, skipping.`
				);
				continue;
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
		for (let result of results) {
			let id = shortHash(result.url);
			let dir = `${dataDir}results/${id}/`;
			let filename = `${dir}date-${today}.json`;
			await fs.mkdir(dir, { recursive: true });
			promises.push(fs.writeFile(filename, JSON.stringify(result, null, 2)));
			console.log(`Writing ${filename}.`);
		}

		await Promise.all(promises);
		lastRuns[key] = { timestamp: today };
		console.log(`Finished testing "${key}".`);
	}

	// Write the last run time to avoid re-runs
	await fs.writeFile(lastRunsFilename, JSON.stringify(lastRuns, null, 2));
})();
