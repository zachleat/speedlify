module.exports = function(obj, which = ":first") {
	let ret;
	let newestTimestamp = 0;
	for(let key in obj) {
		ret = key;
		if(which === ":newest") {
			if(obj[key].timestamp > newestTimestamp) {
				newestTimestamp = obj[key].timestamp;
				ret = key;
			}
		}
		if(which === ":first") {
			return ret;
		}
	}
	return ret;
}