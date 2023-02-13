module.exports = {
	name: "zachleat.com", // optional, falls back to object key
	description: "Zach’s Personal web site",
	// skip if localhost
	// skip if this is a new fork of the speedlify (not Zach’s)
	skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
	options: {
		frequency: 60 * 23, // 23 hours
	},
	urls: [
		"https://www.zachleat.com/",
		"https://www.zachleat.com/web/",
		"https://www.zachleat.com/web/about/",
		"https://www.zachleat.com/web/fonts/",
		"https://www.zachleat.com/web/eleventy/",
		"https://www.zachleat.com/resume/",
		"https://www.zachleat.com/twitter/",
		// Popular Posts
		"https://www.zachleat.com/web/lighthouse-in-footer/",
		"https://www.zachleat.com/web/speedlify/",
		"https://www.zachleat.com/web/comprehensive-webfonts/",
		"https://www.zachleat.com/web/google-fonts-display/",
	]
};