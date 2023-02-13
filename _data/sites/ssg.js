module.exports = {
	name: "SSG", // optional, falls back to object key
	description: "Static Site Generator web sites",
	// skip if localhost
	// skip if this is a new fork of the speedlify (not Zach’s)
	skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
	options: {
		package: "performance-leaderboard",
		frequency: 60 * 6, // 6 hours
	},
	urls: [
		"https://www.11ty.dev/",
		"https://www.gatsbyjs.com/",
		"https://gohugo.io/",
		"https://nextjs.org/",
		"https://nuxtjs.org/",
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