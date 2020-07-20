# speedlify

After you make a fast web site, keep it fast by measuring it over time. Read [Use Speedlify to Continuously Measure Site Performance](https://www.zachleat.com/web/speedlify/). Created by [@zachleat](https://www.zachleat.com/).

* Requires Node 12+
* Each file in `_data/sites/*.js` is a category and contains a list of sites for comparison.

## Run locally

_After cloning you’ll probably want to delete the initial `_data/sites/*.js` files and create your own file with a list of your own site URLs!_

```
npm install
npm run test-pages
npm run start
```

## Deploy to Netlify

Can run directly on Netlify (including your tests) and will save the results to a Netlify build cache (via Netlify Build Plugins, see `plugins/keep-data-cache/`).

_After cloning you’ll probably want to delete the initial `_data/sites/*.js` files and create your own file with a list of your own site URLs!_

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/zachleat/speedlify"><img src="https://www.netlify.com/img/deploy/button.svg" width="146" height="32"></a>

Speedlify will also save your data to `/results.zip` so that you can download later. Though this has proved to be unnecessary so far, it does serve as a fallback backup mechanism in case the Netlify cache is lost. Just look up your previous build URL and download the data to restore.

[![Netlify Status](https://api.netlify.com/api/v1/badges/7298a132-e366-460a-a4da-1ea352a4e790/deploy-status)](https://app.netlify.com/sites/speedlify/deploys)

## Pay for something better

Speedlify is intended as a stepping stone to more robust performance monitoring solutions like:

* [SpeedCurve](https://speedcurve.com/)
* [Calibre](https://calibreapp.com/)
