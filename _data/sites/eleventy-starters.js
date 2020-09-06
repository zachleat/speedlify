const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	let url = "https://www.11ty.dev/api/starters.json";
	let urlsJson = await CacheAsset(url, {
		duration: "0s",
		type: "json",
	});

	return {
		name: "eleventy-starters", // optional, falls back to object key
		description: "Eleventy Starter Projects",
		// skip if localhost
		// skip if this is a new fork of the speedlify (not Zach’s)
		skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
		estimatedTimePerBuild: .3,
		options: {
			frequency: 60 * 23, // 23 hours
			// Use "run" if the sites don’t share assets on the same origin
			//           and we can reset chrome with each run instead of
			//           each site in every run (it’s faster)
			// Use "site" if sites are all on the same origin and share assets.
			freshChrome: "run"
		},

		urls: urlsJson
	};
};