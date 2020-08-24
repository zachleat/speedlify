const fastglob = require("fast-glob");

async function getCategoryToUrlMap() {
	let categories = await fastglob("./_data/sites/*.js", {
		caseSensitiveMatch: false
	});

	let map = {};
	for(let file of categories) {
		let categoryName = file.split("/").pop().replace(/\.js$/, "");
		map[categoryName] = [];

		let categoryData = require(`./sites/${categoryName}.js`);
		if(typeof categoryData === "function") {
			categoryData = await categoryData();
		}
		// TODO lowercase just the origin?
		map[categoryName] = categoryData.urls.map(url => url.toLowerCase());
	}

	return map;
}

function getCategoryList(map, url) {
	let categories = new Set();
	for(let categoryName in map) {
		if(map[categoryName].indexOf(url.toLowerCase())) {
			categories.add(categoryName);
		}
	}
	return Array.from(categories);
}

module.exports = async function() {
	let categoryMap = await getCategoryToUrlMap();

	let resultFiles = await fastglob("./_data/results/**/*.json", {
		caseSensitiveMatch: false
	});

	let sites = {};

	// TODO api JSON ranks should be dependent on category
	for(let resultFile of resultFiles) {
		let split = resultFile.split("/");
		let filename = split.pop();
		let hash = split.pop();

		let resultData = require(`.${resultFile}`);

		let categories = [];
		if(resultData.requestedUrl) {
			categories = getCategoryList(categoryMap, resultData.requestedUrl);
		}

		sites[hash] = {
			requestedUrl: resultData.requestedUrl,
			url: resultData.url,
			// based on final URL not requested URL
			hash: hash,
			categories: categories,
			// Deprecated
			vertical: categories[0],
		};
	}
	return Object.values(sites);
};