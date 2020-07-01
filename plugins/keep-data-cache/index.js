module.exports = {
  // Restore file/directory cached in previous builds.
  // Does not do anything if:
  //  - the file/directory already exists locally
  //  - the file/directory has not been cached yet
  async onPreBuild({ utils }) {
    await utils.cache.restore('./_data/results-last-runs.json');
    await utils.cache.restore('./_data/results');
  },
  // Cache file/directory for future builds.
  // Does not do anything if:
  //  - the file/directory does not exist locally
  async onPostBuild({ utils }) {
    await utils.cache.save('./_data/results-last-runs.json');
    await utils.cache.save('./_data/results');
  }
};