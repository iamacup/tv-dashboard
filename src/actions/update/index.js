
const axios = require('axios');

module.exports = async () => {
  const auth = {
    username: process.argv[2],
    password: process.argv[3],
  };

  const downloadsToSignupCode = 'b7t6nxx';
  const dauCode = 'qj6bgvy';
  const mauCode = '63sqmo7';

  const promises = [];

  promises.push(axios.get(`https://amplitude.com/api/3/chart/${downloadsToSignupCode}/query`, { auth }));
  promises.push(axios.get(`https://amplitude.com/api/3/chart/${dauCode}/query`, { auth }));
  promises.push(axios.get(`https://amplitude.com/api/3/chart/${mauCode}/query`, { auth }));

  try {
    const res = await Promise.all(promises);

    const payload = {};

    res.forEach((value) => {
      if (value.config.url.includes(downloadsToSignupCode)) {
        payload.downloadToSignUp = value.data.data;
      } else if (value.config.url.includes(dauCode)) {
        payload.dau = value.data.data;
      } else if (value.config.url.includes(mauCode)) {
        payload.mau = value.data.data;
      }
    });

    return {
      generalStatus: 'success',
      statusCode: '1',
      payload,
    };
  } catch (error) {
    console.log(error);

    return {
      generalStatus: 'error',
      statusCode: '1',
      payload: 'There was an error!',
    };
  }
};
