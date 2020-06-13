const prettyBytes = require("pretty-bytes");

module.exports = function(eleventyConfig) {
	function pad(num) {
		return (num < 10 ? "0" : "") + num;
	}
	eleventyConfig.addFilter("displayDate", function(timestamp) {
		let date = new Date(timestamp);
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	});

	eleventyConfig.addFilter("displayFilesize", function(size) {
		return prettyBytes(size);
	});

	// Sort an object that has `order` props in values.
	// If prop is not passed in, sorts by object keys
	// Returns an array
	eleventyConfig.addFilter("sortObject", (obj, prop = "___key") => {
		let arr = [];

		for(let key in obj) {
			obj[key].___key = key;
			arr.push(obj[key]);
		}

		let sorted = arr.sort((a, b) => {
			if(a[prop] > b[prop]) {
				return -1;
			}
			if(a[prop] < b[prop]) {
				return 1;
			}
			return 0;
		});

		for(let entry of sorted) {
			delete entry.___key;
		}

		return sorted;
	});

	eleventyConfig.addFilter("getFirstObjectKey", (obj) => {
		for(let key in obj) {
			return key;
		}
	});

	eleventyConfig.addFilter("displayTableCellValue", (value) => {
		if(value === 1) {
			return `✅ ${value * 100}`;
		} else {
			return `🚫 ${value * 100}`;
		}
	});

	eleventyConfig.addFilter("digits", (num, digits = 2) => {
		return parseFloat(num).toFixed(digits);
	});

	eleventyConfig.addPassthroughCopy({
		"./node_modules/chartist/dist/chartist.css": "chartist.css",
		"./node_modules/chartist/dist/chartist.js": "chartist.js",
	});
	eleventyConfig.addPassthroughCopy("chart.js");
	eleventyConfig.addPassthroughCopy("plugins");
	eleventyConfig.addTemplateFormats("css");
};