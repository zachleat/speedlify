const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	let url = "https://www.11ty.dev/api/starters.json";
	let urlsJson = await Fetch(url, {
		duration: "0s",
		type: "json",
	});

	return {
		name: "eleventy-starters", // optional, falls back to object key
		description: "Eleventy Starter Projects",
		// skip if localhost
		// skip if this is a new fork of the speedlify (not Zach’s)
		// skip: true,
		skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
		options: {
			// frequency: 60 * 5.5, // 5.5 hours
			frequency: 1,
		},

		urls: urlsJson,
	};
};