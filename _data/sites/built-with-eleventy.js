const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
	let url = "https://www.11ty.dev/api/urls.json";
	let urlsJson = await CacheAsset(url, {
		duration: "1d",
		type: "json",
	});

	return {
		name: "built-with-eleventy", // optional, falls back to object key
		description: "Web Sites Built with Eleventy",
		// don’t run in Production or on Branch/Deploy previews
		// this one is localhost only.
		skip: process.env.CONTEXT,

		// Hide from category list when hosted
		hide: process.env.CONTEXT && process.env.SITE_NAME !== "speedlify",

		options: {
			// You probably won’t need this, unless the same URL lives in multiple
			// verticals/categories share the same URLs.

			// Eventually this will be the default but if you turn it on for a category
			// with existing data on Netlify cache, Speedlify won’t be able to find your
			// results!
			isolated: true,

			// Data directory, results go into `_data/manual`
			useManualResultsDir: true,

			runs: 3,
			// frequency: 60 * 24 * 7 - 30, // 7 days - 30 minutes
			frequency: 1, // 1 minute
			// Use "run" if the sites don’t share assets on the same origin
			//           and we can reset chrome with each run instead of
			//           each site in every run (it’s faster)
			// Use "site" if sites are all on the same origin and share assets.
			freshChrome: "run"
		},
		urls: urlsJson
	};
};