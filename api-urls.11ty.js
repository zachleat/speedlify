const shortHash = require("short-hash");

class ApiUrls {
	data() {
		return {
			layout: false,
			permalink: function(data) {
				return `/api/urls.json`;
			}
		};
	}

	render(data) {
		let resultData = {};
		for(let urlData of data.urlsForApi) {
			resultData[urlData.requestedUrl] = urlData;
		}
		return JSON.stringify(resultData, null, 2);
	}
}

module.exports = ApiUrls;