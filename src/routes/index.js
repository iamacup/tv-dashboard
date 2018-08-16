

// actions
const actions = require('../actions');

const appRouter = (app) => {
  app.get('/update', async (req, res) => {
    const response = await actions.update();

    res.status(200).send(response);
  });

  app.get('/chartjs.js', async (req, res) => {
    const response = await actions.chartjs();

    res.status(200).send(response);
  });

  app.get('*', async (req, res) => {
    const response = await actions.home();

    res.status(200).send(response);
  });
};

module.exports = appRouter;
