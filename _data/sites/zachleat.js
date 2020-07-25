module.exports = {
	name: "zachleat.com", // optional, falls back to object key
	description: "Zach’s Personal web site",
	// skip if localhost
	// skip if this is a new fork of the speedlify (not Zach’s)
	skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
	options: {
		frequency: 60 * 23, // 23 hours
		// Use "run" if the sites don’t share assets on the same origin
		//           and we can reset chrome with each run instead of
		//           each site in every run (it’s faster)
		// Use "site" if sites are all on the same origin and share assets.
		freshChrome: "site"
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