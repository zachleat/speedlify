module.exports = {
	description: "Front-end Testing Tools",
	// skip if localhost
	// skip if this is a new fork of the speedlify (not Zach’s)
	skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
	options: {
		package: "performance-leaderboard-pagespeed-insights",
		frequency: 60 * 11 + 30, // 11h, 30m
	},
	urls: [
		"https://eslint.org/",
		"https://qunitjs.com/",
		"https://karma-runner.github.io/latest/index.html",
		"https://gulpjs.com/",
		"https://webhint.io/",
		"https://gruntjs.com/",
		"https://theintern.io/",
		"https://istanbul.js.org/",
		"https://webdriver.io/",
		"https://mochajs.org/"
	]
};