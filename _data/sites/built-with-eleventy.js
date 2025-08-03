const Fetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
	const { default: Generator } = await import("@11ty/find-generator");

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
			],

			afterHook: async function({ url }) {
				try {
					let g = new Generator(url);
					await g.fetch({
						duration: "7d", // cache duration
					});
					let raw = g.findData();
					let generatorValue = (raw || "").toLowerCase();
					if(generatorValue && !generatorValue.includes("11ty") && !generatorValue.includes("eleventy")) {
						console.log( `<meta name=generator> mismatch for ${url}: ${generatorValue}. Skipping in results and should likely remove from 11ty-community repository` );
						return false;
					}
				} catch(e) {
					if(!e.message?.includes(`No <meta name='generator' content> element found.`)) {
						console.log( `Error with <meta name=generator> check for ${url}:`, e.message );
					}

					// If no <meta name="generator"> is found, we’ll still include in results for now!
					// return false;
				}
			},
		},
		urls: urlsJson,

		// removed from urls but still exist in result data
		missing: [
		],
		
		// this was a bug when two different URLs resolved to the same URL and conflicted in resolvedUrl results.
		// 1-indexed
		skipIndeces: [
			8,
			100,
		]
	};
};
