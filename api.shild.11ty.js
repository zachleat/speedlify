const getObjectKey = require("./utils/getObjectKey.js");

class ApiEntry {
        async data() {
                return {
                        layout: false,
                        pagination: {
                                size: 1,
                                data: "urlsForApi",
                                alias: "site"
                        },
                        permalink: function(data) {
                                return `/api/${data.site.hash}-shield.json`;
                        }
                };
        }
        render(data) {
                let resultSet = data.results[data.site.hash];
                if(!resultSet) {
                        // TODO better error message here, returns `false` string
                        return {
                                  "schemaVersion": 1,
                                  "label": "SPEEDLIFY",
                                  "message": "NO RESULTS FOUND",
                                  "color": "red"
                                };
                }

                let newestKey = getObjectKey(resultSet, ":newest");
                if(!newestKey) {
                        // TODO better error message here, returns `false` string
                        return {
                                  "schemaVersion": 1,
                                  "label": "SPEEDLIFY",
                                  "message": "NEWEST KEY NOT FOUND",
                                  "color": "red"
                                };
                }

                let secondNewestKey = getObjectKey(resultSet, ":secondnewest");
                if(resultSet[secondNewestKey]) {
                        resultSet[newestKey].previousRanks = resultSet[secondNewestKey].ranks;
                }
                let performance = resultSet[newestKey].lighthouse.performance*100;
                let accessibility = resultSet[newestKey].lighthouse.accessibility*100;
                let bestPractices = resultSet[newestKey].lighthouse.bestPractices*100;
                let seo = resultSet[newestKey].lighthouse.seo*100;
                // TODO set color based on results
                return JSON.stringify({
                        "schemaVersion": 1,
                        "label": "SPEEDLIFY",
                        "message": `${performance}-${accessibility}-${bestPractices}-${seo}`,
                        "color": "green"
                }, null, 2)
        }
}

module.exports = ApiEntry;