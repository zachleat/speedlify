// If you need to disable a site, rename it to end in `.disabled.js`
module.exports = {
	name: "Sample disabled test", // optional, falls back to object key
	description: "This test will not run",
	options: {
		frequency: 60 * 23, // (in minutes), 23 hours
	},
	urls: [
		"https://www.speedlify.dev/"
	]
};