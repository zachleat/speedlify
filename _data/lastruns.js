// Nunjucks workaround for dashes in global `results-last-runs.json` variable name

let lastruns = {};

try {
	lastruns = require("./results-last-runs.json");
} catch(e) {
}

module.exports = lastruns;