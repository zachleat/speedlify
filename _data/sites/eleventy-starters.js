const CacheAsset = require("@11ty/eleventy-cache-assets");

function randomizeArray(arr) {
	let a = arr.slice(0);
	for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

module.exports = async function() {
	let url = "https://www.11ty.dev/api/starters.json";
	let urlsJson = await CacheAsset(url, {
		duration: "0s",
		type: "json",
	});

	return {
		name: "eleventy-starters", // optional, falls back to object key
		description: "Eleventy Starter Projects",
		unordered: true,
		// skip if localhost
		// skip if this is a new fork of the speedlify (not Zach’s)
		skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
		estimatedTimePerBuild: .2,
		options: {
			frequency: 60 * 5.5, // 5.5 hours
			// Use "run" if the sites don’t share assets on the same origin
			//           and we can reset chrome with each run instead of
			//           each site in every run (it’s faster)
			// Use "site" if sites are all on the same origin and share assets.
			freshChrome: "run"
		},

		urls: randomizeArray(urlsJson).slice(0, 20) // a random sample of 20
	};
};