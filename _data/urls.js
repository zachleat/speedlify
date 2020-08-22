const shortHash = require("short-hash");
const fastglob = require("fast-glob");

module.exports = async function() {
	let categories = await fastglob("./_data/sites/*.js", {
		caseSensitiveMatch: false
	});

	let sites = {};
	// TODO what if a site is in multiple categories?
	// TODO api JSON ranks should be dependent on category
	for(let file of categories) {
		let category = file.split("/").pop().replace(/\.js$/, "");
		let categoryData = require(`./sites/${category}.js`);
		if(typeof categoryData === "function") {
			categoryData = await categoryData();
		}

		for(let url of categoryData.urls) {
			sites[url] = {
				url: url,
				hash: shortHash(url),
			};
		}
	}
	return Object.values(sites);
};