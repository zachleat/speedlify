const zip = require("cross-zip");
const path = require("path");

let inPath = path.join(__dirname, "_data", "results");
let outPath = path.join(__dirname, "_site", "results.zip");

zip.zipSync(inPath, outPath);