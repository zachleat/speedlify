module.exports = {
	name: "SSG", // optional, falls back to object key
	description: "Static Site Generator web sites",
	// skip if localhost
	// skip if this is a new fork of the speedlify (not Zach’s)
	skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
	options: {
		frequency: 60 * 23, // 24 hours
		// Use "run" if the sites don’t share assets on the same origin
		//           and we can reset chrome with each run instead of
		//           each site in every run (it’s faster)
		// Use "site" if sites are all on the same origin and share assets.
		freshChrome: "run"
	},
	urls: [
		"https://www.11ty.dev/",
		"https://www.gatsbyjs.com/",
		"https://gohugo.io/",
		"https://nextjs.org/",
		"https://nuxt.com/",
		"https://gridsome.org/",
		"https://vuepress.vuejs.org/",
		"https://docusaurus.io/",
		"https://astro.build/",
		"https://jekyllrb.com/",
		"https://hexo.io/",
		"https://kit.svelte.dev/",
		"https://remix.run/",
		"https://record-collector.net/",
	]
};