module.exports = {
	netlify: {
		name: "Netlify", // optional, falls back to object key
		description: "Netlify web sites",
		options: {
			frequency: 60 * 23, // 24 hours
			freshChrome: "site",
		},
		urls: [
			"https://www.netlify.com/",
			"https://www.netlify.com/donation-matching/",
			"https://www.netlify.com/products/build/plugins/",
			"https://www.netlify.com/with/sitecore/",
			"https://www.netlify.com/with/drupal/",
			"https://www.netlify.com/with/wordpress/",
			"https://www.netlify.com/webinar/a-drupal-journey-to-the-jamstack/",
			"https://jamstackconf.com/",
			"https://jamstackconf.com/virtual/",
		]
	},
	ssg: {
		name: "SSG", // optional, falls back to object key
		description: "Static Site Generator web sites",
		options: {
			frequency: 60 * 23, // 24 hours
			// if the sites don’t share assets on the same domain, we can reset
			// chrome with each run instead of each site in every run (it’s faster)
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
	},
	zachleat: {
		name: "zachleat.com", // optional, falls back to object key
		description: "Personal web site",
		options: {
			frequency: 60 * 23, // 23 hours
			freshChrome: "site"
		},
		urls: [
			"https://www.zachleat.com/",
			"https://www.zachleat.com/web/",
			"https://www.zachleat.com/web/about/",
			"https://www.zachleat.com/twitter/",
			"https://www.zachleat.com/resume/",
			"https://www.zachleat.com/web/comprehensive-webfonts/",
			"https://www.zachleat.com/web/google-fonts-display/",
		]
	}
};