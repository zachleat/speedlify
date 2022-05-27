module.exports = {
	name: "Sites", // optional, falls back to object key
	description: "Main websites test",
	options: {
		// frequency: 60 * 23, // (in minutes), 23 hours
		frequency: 1, // (in minutes), 12 hours
	},
	urls: [
		"https://www.laurent.la/",
		"https://www.atelierunearchitecture.com/",
		//"https://website-702.eventmaker.io/", // fix issue with youtube
		"https://www.convention-usf.fr/",
		// "https://eurofa.eventmaker.io/", // fix issue with youtube latency.
		"https://website-29177.eventmaker.io/",
		"https://www.losangexpo.com/",
		"https://www.eventmaker.com/",
		"https://www.toushanscene.fr/"
	]
};
