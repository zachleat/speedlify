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
		for(let vertical in data.sites) {
			let verticalData = data.sites[vertical];
			for(let url of verticalData.urls) {
				resultData[url] = {
					vertical,
					hash: shortHash(url),
				};
			}
		}
		return JSON.stringify(resultData, null, 2);
	}
}

module.exports = ApiUrls;