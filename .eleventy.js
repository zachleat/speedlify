const byteSize = require("byte-size");
const shortHash = require("short-hash");
const lodash = require("lodash");
const getObjectKey = require("./utils/getObjectKey.js");

function showDigits(num, digits = 2, alwaysShowDigits = true) {
	let toNum = parseFloat(num);
	if(!alwaysShowDigits && toNum === Math.floor(toNum)) {
		// if a whole number like 0, just show 0 and not 0.00
		return toNum;
	}
	return toNum.toFixed(digits);
}

function pad(num) {
	return (num < 10 ? "0" : "") + num;
}

function mapProp(prop, targetObj) {
	if(Array.isArray(prop)) {
		let otherprops = [];
		prop =  prop.map(entry => {
			// TODO this only works as the first entry
			if(entry === ":lastkey") {
				entry = Object.keys(targetObj).sort().pop();
			} else if(entry.indexOf("||") > -1) {
				for(let key of entry.split("||")) {
					if(lodash.get(targetObj, [...otherprops, key])) {
						entry = key;
						break;
					}
				}
			}
			otherprops.push(entry);

			return entry;
		});
	}

	return prop;
}

function getLighthouseTotal(entry) {
	return entry.lighthouse.performance * 100 +
		entry.lighthouse.accessibility * 100 +
		entry.lighthouse.bestPractices * 100 +
		entry.lighthouse.seo * 100;
}

module.exports = function(eleventyConfig) {
	eleventyConfig.addFilter("shortHash", shortHash);

	eleventyConfig.addFilter("repeat", function(str, times) {
		let result = '';

		for (let i = 0; i < times; i++) {
			result += str;
		}

		return result;
	});

	// first ${num} entries (and the last entry too)
	eleventyConfig.addFilter("headAndLast", function(arr, num) {
		if(num && num < arr.length) {
			let newArr = arr.slice(0, num);
			newArr.push(arr[arr.length - 1]);
			return newArr;
		}
		return arr;
	});

	eleventyConfig.addFilter("displayUrl", function(url) {
		url = url.replace("https://www.", "");
		url = url.replace("https://", "");
		return url;
	});

	eleventyConfig.addFilter("showDigits", function(num, digits) {
		return showDigits(num, digits, false);
	});

	eleventyConfig.addFilter("displayTime", function(time) {
		let num = parseFloat(time);
		if(num > 850) {
			return `${showDigits(num / 1000, 2)}s`;
		}
		return `${showDigits(num, 0)}ms`;
	});

	eleventyConfig.addFilter("displayFilesize", function(size) {
		let normalizedSize = byteSize(size, { units: 'iec', precision: 0 });
		let unit = normalizedSize.unit;
		let value = normalizedSize.value;
		return `<span class="filesize">${value}<span class="filesize-label-sm">${unit.substr(0,1)}</span><span class="filesize-label-lg"> ${unit}</span></span>`;
	});

	eleventyConfig.addFilter("displayDate", function(timestamp) {
		let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		let date = new Date(timestamp);
		let day = `${months[date.getMonth()]} ${pad(date.getDate())}`;
		return `${day} <span class="leaderboard-hide-md">${pad(date.getHours())}:${pad(date.getMinutes())}</span>`;
	});

	// Works with arrays too
	// Sort an object that has `order` props in values.
	// If prop is not passed in, sorts by object keys
	// Returns an array
	eleventyConfig.addFilter("sort", (obj, prop = "___key") => {
		let arr;
		let defaultKey = "___key";
		if(Array.isArray(obj)) {
			arr = obj;
		} else {
			arr = [];

			for(let key in obj) {
				if(prop === defaultKey) {
					obj[key][defaultKey] = key;
				}
				arr.push(obj[key]);
			}
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

		if(!Array.isArray(obj)) {
			if(prop === defaultKey) {
				for(let entry of sorted) {
					delete entry[defaultKey];
				}
			}
		}

		return sorted;
	});

	eleventyConfig.addFilter("getObjectKey", getObjectKey);

	eleventyConfig.addFilter("filterToUrls", (obj, urls = []) => {
		let arr = [];
		for(let key in obj) {
			let result;
			for(let filename in obj[key]) {
				result = obj[key][filename];
				break;
			}
			if(urls.indexOf(result.requestedUrl) > -1) {
				arr.push(obj[key]);
			}
		}
		return arr;
	});

	eleventyConfig.addFilter("hundoCount", (entry) => {
		let count = 0;
		if(entry.lighthouse.performance === 1) {
			count++;
		}
		if(entry.lighthouse.accessibility === 1) {
			count++;
		}
		if(entry.lighthouse.bestPractices === 1) {
			count++;
		}
		if(entry.lighthouse.seo === 1) {
			count++;
		}

		return count;
	});

	eleventyConfig.addFilter("lighthouseTotal", getLighthouseTotal);

	eleventyConfig.addFilter("addLighthouseTotals", (arr) => {
		/* special case */
		for(let obj of arr) {
			for(let entry in obj) {
				if(obj[entry].lighthouse) {
					obj[entry].lighthouse[":lhtotal"] = getLighthouseTotal(obj[entry]);
				}
			}
		}
		return arr;
	});

	eleventyConfig.addFilter("toJSON", function(obj) {
		return JSON.stringify(obj);
	});

	// Assets
	eleventyConfig.addPassthroughCopy({
		"./node_modules/chartist/dist/chartist.js": "chartist.js",
		"./node_modules/chartist/dist/chartist.css.map": "chartist.css.map",
	});

	eleventyConfig.addWatchTarget("./assets/");

	eleventyConfig.addPairedShortcode("starterMessage", (htmlContent, results) => {
		if(process.env.SITE_NAME !== "speedlify") {
			return htmlContent;
		}
		return "";
	});

	eleventyConfig.setBrowserSyncConfig({
		ui: false,
		ghostMode: false
	});
};
