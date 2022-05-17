module.exports = {
	name: "Sites", // optional, falls back to object key
	description: "Main websites test",
	options: {
		// frequency: 60 * 23, // (in minutes), 23 hours
		frequency: 60 * 12, // (in minutes), 12 hours
	},
	urls: [
		"https://www.laurent.la/",
		"https://www.atelierunearchitecture.com/",
		"https://www.eventmaker.com/",
		"https://www.convention-usf.fr/",
		"https://website-702.eventmaker.io/"
	]
};
