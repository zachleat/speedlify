const shortHash = require("short-hash");

class ApiUrls {
	data() {
		return {
			layout: false,
			permalink: function(data) {
				return `/speedlify/api/urls.json`;
			}
		};
	}

	render(data) {
		return JSON.stringify(data.urlsForApi, null, 2);
	}
}

module.exports = ApiUrls;