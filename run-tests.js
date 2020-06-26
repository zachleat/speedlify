const fs = require("fs").promises;
const shortHash = require("short-hash");
const PerfLeaderboard = require("performance-leaderboard");

const NUMBER_OF_RUNS = 3;

(async function() {
	let today = Date.now();
	let dataDir = `./_data/`;
	let lastRunFilename = `${dataDir}results-last-run.json`;
	try {
		const lastRun = require(lastRunFilename);
		const lastRunHoursAgo = (today - lastRun.timestamp) / (1000*60*60);
		console.log( `Tests ran ${lastRunHoursAgo} hours ago.`, lastRun );
		// if(lastRunHoursAgo < 1) {
		// 	console.log( "Test ran less than an hour ago, skipping." );
		// 	return;
		// }
	} catch(e) {
		console.log( `Error comparing ${lastRunFilename}`, e );
	}

	let groups = require("./_data/sites.js");
	for(let key in groups) {
		let group = groups[key];
		let runCount = group.options && group.options.runs ? group.options.runs : NUMBER_OF_RUNS;
		let results = await PerfLeaderboard(group.urls, runCount, group.options || {});

		let promises = [];
		for(let result of results) {
			let id = shortHash(result.url);
			let dir = `${dataDir}results/${id}/`;
			let filename = `${dir}date-${today}.json`;
			await fs.mkdir(dir, { recursive: true });
			promises.push(fs.writeFile(filename, JSON.stringify(result, null, 2)));
			console.log( `Writing ${filename}.` );
		}

		await Promise.all(promises);
		console.log( `Finished testing "${key}".` );
	}

	// Write the last run time to avoid re-runs
	await fs.writeFile(lastRunFilename, JSON.stringify({ timestamp: today }, null, 2));
})();