const fs = require("fs").promises;
const shortHash = require('short-hash');
const PerfLeaderboard = require("performance-leaderboard");

const NUMBER_OF_RUNS = 3;

(async function() {
	let urls = require("./test-sites.js");

	let results = await PerfLeaderboard(urls, NUMBER_OF_RUNS, {
		freshChrome: "site"
	});

	let today = Date.now();

	let promises = [];
	for(let result of results) {
		let id = shortHash(result.url);
		let dir = `./_data/results/${id}/`;
		let filename = `${dir}date-${today}.json`;
		await fs.mkdir(dir, { recursive: true });
		promises.push(fs.writeFile(filename, JSON.stringify(result, null, 2)));
		console.log( `Writing ${filename}.` );
	}

	await Promise.all(promises);

})();