
/* eslint-disable no-tabs */

const fs = require('fs');

module.exports = async () => {
  const contents = fs.readFileSync(`${__dirname}/files/charts.js`, 'utf8');

  return contents;
};
