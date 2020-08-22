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
		hide: false,

		options: {
			// Don’t show speedlify score or rank for sites with more than 2 or more yellow circles
			noShame: true,
		},
		urls: urlsJson
	};
};