module.exports = {
	name: "Netlify", // optional, falls back to object key
	description: "Netlify web sites",
	// skip if localhost
	// skip if this is a new fork of the speedlify (not Zach’s)
	skip: !process.env.CONTEXT || process.env.SITE_NAME !== "speedlify",
	options: {
		frequency: 60 * 11 + 30, // 11h, 30m
		// Use "run" if the sites don’t share assets on the same origin
		//           and we can reset chrome with each run instead of
		//           each site in every run (it’s faster)
		// Use "site" if sites are all on the same origin and share assets.
		freshChrome: "site",
	},
	urls: [
		"https://www.netlify.com/donation-matching/",
		"https://www.netlify.com/products/build/plugins/",
		"https://www.netlify.com/with/sitecore/",
		"https://www.netlify.com/with/drupal/",
		"https://www.netlify.com/with/wordpress/",
		"https://www.netlify.com/webinar/a-drupal-journey-to-the-jamstack/",
		"https://www.netlify.com/partners/agency/",
		"https://www.netlify.com/careers/",
		"https://www.netlify.com/pricing/",
		"https://www.netlify.com/pricing/pro/",
		"https://www.netlify.com/pricing/business/",
		"https://www.netlify.com/privacy/",
		"https://www.netlify.com/gdpr-ccpa/",
		"https://www.netlify.com/with/gatsby/",
		"https://www.netlify.com/",
		"https://jamstackconf.com/",
		"https://jamstackconf.com/virtual/",
		"https://headlesscommercesummit.com/",
	]
};