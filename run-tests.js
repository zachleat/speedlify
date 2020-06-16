const fs = require("fs").promises;
const shortHash = require("short-hash");
const PerfLeaderboard = require("performance-leaderboard");

const NUMBER_OF_RUNS = 3;

(async function() {
	let today = Date.now();
	let dataDir = `./_data/`;
	let lastRunFilename = `${dataDir}results-last-run.json`;
	const lastRun = require(lastRunFilename);
	if(today - lastRun.timestamp < 1000*60*60) {
		console.log( "Test ran less than an hour ago, just building the site." );
		return;
	}
	await fs.writeFile(lastRunFilename, JSON.stringify({ timestamp: today }, null, 2));

	let urls = require("./test-sites.js");
	let results = await PerfLeaderboard(urls, NUMBER_OF_RUNS, {
		freshChrome: "site"
	});


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

})();