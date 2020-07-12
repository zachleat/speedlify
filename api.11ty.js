const shortHash = require("short-hash");
const getObjectKey = require("./utils/getObjectKey.js");

class Api {
	data() {
		return {
			layout: false,
			pagination: {
				size: 1,
				data: "sites",
				before: function(paginationData) {
					let data = [];
					for(let vertical of paginationData) {
						let verticalData = require(`./_data/sites/${vertical}.js`);
						for(let url of verticalData.urls) {
							data.push({
								vertical: vertical,
								url: url,
								hash: shortHash(url),
							});
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