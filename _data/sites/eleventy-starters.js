module.exports = {
	name: "eleventy-starters", // optional, falls back to object key
	description: "Eleventy Starter Projects",
	// skip if localhost
	// skip if this is a new fork of the speedlify (not Zach’s)
	skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
	options: {
		frequency: 60 * 23, // 23 hours
		// Use "run" if the sites don’t share assets on the same origin
		//           and we can reset chrome with each run instead of
		//           each site in every run (it’s faster)
		// Use "site" if sites are all on the same origin and share assets.
		freshChrome: "run"
	},
	urls: [
		"https://eleventy-base-blog.netlify.app/",
		"https://hylia.website/",
		"https://eleventyone.netlify.app/",
		"https://eleventy-netlify-boilerplate.netlify.app/",
		"https://skeleventy.netlify.app/",
		"https://eleventy.ghost.org/",
		"https://7ty.tech/",
		"https://xity-starter.netlify.app/",
		"https://webstarter.chriscollins.me/",
		"https://pack11ty.dev/",
		"https://11ty-netlify-jumpstart.netlify.app/",
		"https://elevenpack.netlify.app/",
		"https://eleventy-dot-js-blog.netlify.app/",
		"https://11st-starter-kit.netlify.app/",
		"https://disjfa.github.io/eleventy-encore/",
		"https://danfascia.github.io/tai11s/",
		"https://eleventastic.netlify.app/",
		"https://supermaya-demo.netlify.app/",
		"https://creativedesignsguru.com/demo/Eleventy-Starter-Boilerplate/",
	]
};
