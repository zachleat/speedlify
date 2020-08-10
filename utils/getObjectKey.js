module.exports = function(obj, which = ":first") {
	if(which === ":first") {
		for(let key in obj) {
			return key;
		}
	}

	let arr = [];
	for(let key in obj) {
		arr.push({
			timestamp: obj[key].timestamp,
			key: key
		});
	}

	// lower is better
	arr.sort((a, b) => a.timestamp - b.timestamp);

	if(arr.length && which === ":newest") {
		return arr[arr.length - 1].key;
	} else if(arr.length > 1 && which === ":secondnewest") {
		return arr[arr.length - 2].key;
	}
}