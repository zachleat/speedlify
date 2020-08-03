module.exports = (sites, type, key, greaterThanOrEqualTo = 1) => {
	let sum = 0;
	let values = [];
	let keys;
	if(Array.isArray(key)) {
		keys = key;
	} else {
		keys = [key];
	}
	let count = 0;
	for(let site of sites) {
		let test = true;
		for(let key of keys) {
			if(isNaN(site[key]) || site[key] < greaterThanOrEqualTo) {
				test = false;
			}
		}
		if(test) {
			count++;
		}
		if(typeof site[key] === "number") {
			sum += site[key];
			values.push(site[key]);
		}
	}
	if(type === "count") {
		return count;
	}
	if(type === "mean") {
		return sum / values.length;
	}
	if(type === "median") {
		if(values.length > 0) {
			return values.sort((a, b) => b - a)[Math.floor(values.length / 2)];
		}
	}
};