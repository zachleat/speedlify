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
		// unordered: true,
		options: {
			package: "performance-leaderboard-pagespeed-insights",
			frequency: 60 * 23, // 23 hours
		},

		urls: urlsJson,
	};
};