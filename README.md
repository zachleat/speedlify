# speedlify

After you make a fast web site, keep it fast by measuring it over time. Read [Use Speedlify to Continuously Measure Site Performance](https://www.zachleat.com/web/speedlify/). Created by [@zachleat](https://www.zachleat.com/).

* Requires Node 12+
* Each file in `_data/sites/*.js` is a category and contains a list of sites for comparison.
  * A site file can be disabled by ending its filename with `.disabled.js`.

## Run locally

_After cloning you’ll probably want to delete the initial `_data/sites/*.js` files and create your own file with a list of your own site URLs!_

```
npm install
npm run test-pages
npm run start
```

## Related

* [The Eleventy Leaderboards](https://www.zachleat.com/web/eleventy-leaderboard-speedlify/) are running on Speedlify
* [speedlify.dev](https://www.speedlify.dev/) shows some sample categories
* Use the [`<speedlify-score>` component](https://github.com/zachleat/speedlify-score) to show your scores on your page. Read more at [I added Lighthouse Scores to my Site’s Footer and You Can Too](https://www.zachleat.com/web/lighthouse-in-footer/)
* The [Eleventy Starter Projects list](https://www.11ty.dev/docs/starter/) shows Lighthouse scores from Speedlify. Read more at [The Lighthouse Scores Will Continue Until Morale Improves](https://www.zachleat.com/web/11ty-lighthouse/).

## Deploy to Netlify

Can run directly on Netlify (including your tests) and will save the results to a Netlify build cache (via Netlify Build Plugins, see `plugins/keep-data-cache/`).

_After cloning you’ll probably want to delete the initial `_data/sites/*.js` files and create your own file with a list of your own site URLs!_

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/zachleat/speedlify"><img src="https://www.netlify.com/img/deploy/button.svg" width="146" height="32"></a>

Speedlify will also save your data to `/results.zip` so that you can download later. Though this has proved to be unnecessary so far, it does serve as a fallback backup mechanism in case the Netlify cache is lost. Just look up your previous build URL and download the data to restore.

[![Netlify Status](https://api.netlify.com/api/v1/badges/7298a132-e366-460a-a4da-1ea352a4e790/deploy-status)](https://app.netlify.com/sites/speedlify/deploys)

* **Run every day or week**: You can set Speedlify to run at a specified interval using a Netlify Build Hook, read more on the Eleventy docs: [Quick Tip #008—Trigger a Netlify Build Every Day with IFTTT](https://www.11ty.dev/docs/quicktips/netlify-ifttt/).

## Known Limitations

* If you change a URL to remove a redirect (to remove or add a `www.`, moved domains, etc), you probably want to delete the old URL’s data otherwise you’ll have two entries in the results list.
* When running on Netlify, a single category has a max limit on the number of sites it can test, upper bound on how many tests it can complete in the 15 minute Netlify build limit.
* The same URL cannot be listed in two different categories (yet).

## Pay for something better

Speedlify is intended as a stepping stone to more robust performance monitoring solutions like:

* [SpeedCurve](https://speedcurve.com/)
* [Calibre](https://calibreapp.com/)
* [DebugBear](https://www.debugbear.com/)