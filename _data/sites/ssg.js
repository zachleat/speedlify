module.exports = {
	name: "SSG", // optional, falls back to object key
	description: "Static Site Generator web sites",
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
		"https://www.gatsbyjs.org/",
		"https://gohugo.io/",
		"https://nextjs.org/",
		"https://nuxtjs.org/",
		"https://gridsome.org/",
		"https://vuepress.vuejs.org/",
		"https://v2.docusaurus.io/",
		"https://docsify.js.org/",
		"https://jekyllrb.com/",
		"https://hexo.io/",
		"https://sapper.svelte.dev/",
	]
};