const shortHash = require("short-hash");
const getObjectKey = require("./utils/getObjectKey.js");

class Api {
	data() {
		return {
			layout: false,
			pagination: {
				size: 1,
				data: "sites",
				before: async function(paginationData) {
					let urlLookup = {};
					let data = [];
					for(let vertical of paginationData) {
						let verticalData = require(`./_data/sites/${vertical}.js`);
						if(typeof verticalData === "function") {
							verticalData = await verticalData();
						}
						for(let url of verticalData.urls) {
							if(!urlLookup[url]) {
								data.push({
									url: url,
									hash: shortHash(url),
								});
								urlLookup[url] = true;
							}
						}
					}
					return data;
				},
				alias: "site"
			},
			permalink: function(data) {
				return `/api/${data.site.hash}.json`;
			}
		};
	}

	render(data) {
		let resultSet = data.results[data.site.hash];
		if(!resultSet) {
			return false;
		}
		let newestKey = getObjectKey(resultSet, ":newest");
		if(!newestKey) {
			return false;
		}
		return JSON.stringify(resultSet[newestKey], null, 2);
	}
}

module.exports = Api;