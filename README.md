# speedlify

After you make a fast web site, keep it fast by measuring it over time.

* Requires Node 12+
* Modify `_data/sites.js` with your list of URLs.

## Run locally

```
npm install
npm run test-pages
npm run start
```

## Features

* Can run directly on Netlify (including your tests) and will save the results to a local cache (via Netlify Build Plugins, see `plugins/keep-data-cache/`).
* Saves your data to `/results.zip` so that you can download later. This serves as a fallback backup mechanism in case your Netlify cache gets blown away. Just look up your previous build URL and download the data to restore.
