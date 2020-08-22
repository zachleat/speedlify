const byteSize = require("byte-size");
const shortHash = require("short-hash");
const lodash = require("lodash");
const getObjectKey = require("./utils/getObjectKey.js");
const calc = require("./utils/calc.js");

function hasUrl(urls, url) {
	url = url.toLowerCase();
	let lowercaseUrls = urls.map(url => url.toLowerCase());

	if(lowercaseUrls.indexOf(url) > -1 || url.endsWith("/") && lowercaseUrls.indexOf(url.substr(0, url.length - 1)) > -1) {
		return true;
	}

	return false;
}

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
			if(entry === ":newest") {
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
		if(url.endsWith("/index.html")) {
			url = url.replace("/index.html", "/");
		}
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

	eleventyConfig.addFilter("sortCumulativeScore", (obj) => {
		return obj.sort((a, b) => {

			let newestKeyA = Object.keys(a).sort().pop();
			let newestKeyB = Object.keys(b).sort().pop();

			// Lighthouse error
			// e.g. { url: 'https://mangoweb.net/', error: 'Unknown error.' }
			if(b[newestKeyB].error && a[newestKeyA].error) {
				return 0;
			} else if(b[newestKeyB].error) {
				return -1;
			} else if(a[newestKeyA].error) {
				return 1;
			}

			if(a[newestKeyA].lighthouse.total !== b[newestKeyB].lighthouse.total) {
				// higher is better
				return b[newestKeyB].lighthouse.total - a[newestKeyA].lighthouse.total;
			}

			// Axe error
			// axe: { error: { name: 'TimeoutError' } } }
			if(b[newestKeyB].axe.error && a[newestKeyA].axe.error) {
				return 0;
			} else if(b[newestKeyB].axe.error) {
				return -1;
			} else if(a[newestKeyA].axe.error) {
				return 1;
			}

			if(a[newestKeyA].axe.violations !== b[newestKeyB].axe.violations) {
				// lower is better
				return a[newestKeyA].axe.violations - b[newestKeyB].axe.violations;
			}
			// lower speed index, higher page weight is better
			return a[newestKeyA].speedIndex / a[newestKeyA].weight.total - b[newestKeyB].speedIndex / b[newestKeyB].weight.total;
		});
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

	function filterResultsToUrls(obj, urls = [], skipKeys = []) {
		let arr = [];
		for(let key in obj) {
			if(skipKeys.indexOf(key) > -1) {
				continue;
			}

			let result;
			for(let filename in obj[key]) {
				result = obj[key][filename];
				break;
			}

			if(urls === true || hasUrl(urls, result.requestedUrl || result.url)) {
				arr.push(obj[key]);
			}
		}
		return arr;
	}

	eleventyConfig.addFilter("getSites", (results, sites, vertical, skipKeys = []) => {
		let urls = sites[vertical].urls;
		let isIsolated = sites[vertical].options && sites[vertical].options.isolated === true;
		let prunedResults = isIsolated ? results[vertical] : results;
		return filterResultsToUrls(prunedResults, urls, skipKeys);
	});

	// Deprecated, use `getSites` instead, it works with isolated categories
	eleventyConfig.addFilter("filterToUrls", filterResultsToUrls);

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

	eleventyConfig.addFilter("notGreenCircleCount", (entry) => {
		let count = 0;
		if(entry.lighthouse.performance < .9) {
			count++;
		}
		if(entry.lighthouse.accessibility < .9) {
			count++;
		}
		if(entry.lighthouse.bestPractices < .9) {
			count++;
		}
		if(entry.lighthouse.seo < .9) {
			count++;
		}

		return count;
	});

	eleventyConfig.addFilter("hundoCountTotals", (counts, entry) => {
		if(!entry.error && !isNaN(entry.lighthouse.performance)) {
			counts.total++;
		}

		if(entry.lighthouse.performance === 1) {
			counts.performance++;
		}
		if(entry.lighthouse.accessibility === 1) {
			counts.accessibility++;
		}
		if(entry.lighthouse.bestPractices === 1) {
			counts.bestPractices++;
		}
		if(entry.lighthouse.seo === 1) {
			counts.seo++;
		}

		if(entry.lighthouse.performance === 1 && entry.lighthouse.accessibility === 1 && entry.lighthouse.bestPractices === 1 && entry.lighthouse.seo === 1) {
			counts.perfect++;
		}

		return counts;
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

	eleventyConfig.addFilter("calc", calc);

	eleventyConfig.addPairedShortcode("starterMessage", (htmlContent) => {
		if(process.env.SITE_NAME !== "speedlify") {
			return htmlContent;
		}
		return "";
	});

	// Assets
	eleventyConfig.addPassthroughCopy({
		"./node_modules/chartist/dist/chartist.js": "chartist.js",
		"./node_modules/chartist/dist/chartist.css.map": "chartist.css.map",
	});

	eleventyConfig.addWatchTarget("./assets/");

	eleventyConfig.setBrowserSyncConfig({
		ui: false,
		ghostMode: false
	});
};
