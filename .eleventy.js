const prettyBytes = require("pretty-bytes");
const shortHash = require("short-hash");
const lodash = require("lodash");

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter("shortHash", function(value) {
		return shortHash(value);
	});

	function pad(num) {
		return (num < 10 ? "0" : "") + num;
	}
	eleventyConfig.addFilter("displayDate", function(timestamp) {
		let date = new Date(timestamp);
		let day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
		return `${day} ${date.getHours()}:${pad(date.getMinutes())}`;
	});

	eleventyConfig.addFilter("displayFilesize", function(size) {
		return prettyBytes(size);
	});


	function mapProp(prop, targetObj) {
		if(Array.isArray(prop)) {
			prop =  prop.map(entry => {
				if(entry === ":lastkey") {
					let ret;
					for(let key in targetObj) {
						ret = key;
					}
					return ret;
				}

				return entry;
			});
		}

		return prop;
	}

	// Sort an object that has `order` props in values.
	// If prop is not passed in, sorts by object keys
	// Returns an array
	eleventyConfig.addFilter("sortObject", (obj, prop = "___key") => {
		let arr = [];
		let defaultKey = "___key";

		for(let key in obj) {
			if(prop === defaultKey) {
				obj[key][defaultKey] = key;
			}
			arr.push(obj[key]);
		}

		let sorted = arr.sort((a, b) => {
			let aVal = lodash.get(a, mapProp(prop, a));
			let bVal = lodash.get(b, mapProp(prop, b));
			if(aVal > bVal) {
				return -1;
			}
			if(aVal < bVal) {
				return 1;
			}
			return 0;
		});

		if(prop === defaultKey) {
			for(let entry of sorted) {
				delete entry[defaultKey];
			}
		}

		return sorted;
	});

	eleventyConfig.addFilter("getObjectKey", (obj, which = "first") => {
		let ret;
		for(let key in obj) {
			ret = key;
			if(which === "first") {
				return ret;
			}
		}
		return ret;
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
	eleventyConfig.addTemplateFormats("css");
};