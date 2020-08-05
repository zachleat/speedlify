const shortHash = require("short-hash");
const fastglob = require("fast-glob");

module.exports = async function() {
	let categories = await fastglob("./_data/sites/*.js", {
		caseSensitiveMatch: false
	});

	let isolated = new Set();
	for(let file of categories) {
		let category = file.split("/").pop().replace(/\.js$/, "");
		let categoryData = require(`./sites/${category}.js`);
		if(typeof categoryData === "function") {
			categoryData = await categoryData();
		}

		if(categoryData.options && categoryData.options.isolated) {
			isolated.add(category);
		}
	}

	return Array.from(isolated);
};