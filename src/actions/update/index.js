
const axios = require('axios');
const likes = require('likes');
const instagramScraper = require('simple-instagram-scraper');

module.exports = async () => {
  /* DO THE SOCIAL STUFF */

  const twitter = new Promise((resolve, reject) => {
    likes.twitter('jafa', (err, count) => {
      if (err) {
        resolve('???');
      }

      resolve(count);
    });
  });

  const twitterFollowers = await twitter;

  const report = await instagramScraper.getReport('jafa.app');
  const instagramFollowers = report.followers;

  /* DO THE AMPLITUDE STUFF */

  const auth = {
    username: process.argv[2],
    password: process.argv[3],
  };

  const dataObj = {
    retention: 'qnx46wc',
    day30: 'qac043w',
    day1: 'e901yjc',
    druDaily: 'qmhat7x',
    druWeekly: 'yqsrdhz',
    druMonthly: 'risws1c',
    mauWeekly: 'agjrhdl',
    mauMonthly: 'rplk2io',
  };

  const keys = Object.keys(dataObj);

  const promises = [];

  keys.forEach((value) => {
    promises.push(axios.get(`https://amplitude.com/api/3/chart/${dataObj[value]}/query`, { auth }));
  });

  try {
    const res = await Promise.all(promises);

    const payload = {};

    res.forEach((value) => {
      keys.forEach((value2) => {
        if (value.config.url.includes(dataObj[value2])) {
          payload[value2] = value.data.data;
        }
      });
    });

    payload.social = {
      twitterFollowers,
      instagramFollowers,
    };

    return {
      generalStatus: 'success',
      statusCode: '1',
      payload,
    };
  } catch (error) {
    console.log(error.response);

    return {
      generalStatus: 'error',
      statusCode: '1',
      payload: error.response.data,
    };
  }
};
