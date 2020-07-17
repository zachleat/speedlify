module.exports = {
	name: "Netlify", // optional, falls back to object key
	description: "Netlify web sites",
	options: {
		frequency: 60 * 23, // 24 hours
		// Use "run" if the sites don’t share assets on the same origin
		//           and we can reset chrome with each run instead of
		//           each site in every run (it’s faster)
		// Use "site" if sites are all on the same origin and share assets.
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
		"https://www.netlify.com/partners/agency/",
		"https://www.netlify.com/careers/",
		"https://jamstackconf.com/",
		"https://jamstackconf.com/virtual/",
	]
};