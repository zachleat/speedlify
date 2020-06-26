module.exports = {
	netlify: {
		description: "Netlify web sites",
		options: {
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
			"https://www.netlify.com/pricing/",
			"https://jamstackconf.com/",
			"https://jamstackconf.com/virtual/",
		]
	},
	ssg: {
		description: "Static Site Generator web sites",
		options: {
			freshChrome: "site"
		},
		urls: [
			"https://www.11ty.dev/",
			"https://www.gatsbyjs.org/",
			"https://gohugo.io/",
			"https://nextjs.org/",
			"https://nuxtjs.org/",
			// "https://vuepress.vuejs.org/", // kept timing out in lighthouse
			"https://gridsome.org/",
		]
	}
};