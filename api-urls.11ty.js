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
				if(resultData[url]) {
					resultData[url].categories = Array.from(new Set([vertical, ...resultData[url].categories]));
				} else {
					resultData[url] = {
						categories: [vertical],
						hash: shortHash(url),
					};
				}

				// vertical is deprecated and only holds one category!
				if(!verticalData.options || !verticalData.options.isolated) {
					resultData[url].vertical = vertical;
				}
			}
		}
		return JSON.stringify(resultData, null, 2);
	}
}

module.exports = ApiUrls;