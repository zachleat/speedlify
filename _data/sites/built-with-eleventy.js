const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	let url = "https://www.11ty.dev/api/urls.json";
	let urlsJson = await Fetch(url, {
		duration: "2d",
		type: "json",
	});

	return {
		name: "speedlify",
		description: "web sites Built with Eleventy",

		// don’t run in Production or on Branch/Deploy previews
		// this one is localhost only.
		skip: process.env.CONTEXT,

		// Hide from category list when hosted
		hide: false,

		options: {
			// Don’t show speedlify score or rank for sites with more than 2 yellow circles
			noShame: true,

			// reuse
			// readFromLogDirectory: true,

			// Skip URL for axe (hanging without timeout even on axe cli)
			bypassAxe: [
				"https://personalsit.es/"
			]
		},
		urls: urlsJson,

		// removed from urls but still exist in result data
		missing: [
		],

		// this was a bug when two different URLs resolved to the same URL and conflicted in resolvedUrl results.
		// 1-indexed
		skipIndeces: [
			262, // astro
			330 - 1,
			366 - 2, // astro
			493 - 3, // hugo
			852 - 4, // ?
			856 - 5, // meetup
			858 - 6, // wordpress
			880 - 7, // xlog
			882 - 8, // web.dev
			892 - 9, // ?
			915 - 10, // ?
		]
	};
};
