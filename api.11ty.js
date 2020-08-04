const getObjectKey = require("./utils/getObjectKey.js");

class ApiEntry {
	async data() {
		return {
			layout: false,
			pagination: {
				size: 1,
				data: "urls",
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

module.exports = ApiEntry;