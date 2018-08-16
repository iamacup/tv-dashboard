
const colors = require('colors');

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const server = app.listen(port, () => {
  console.log('app running on port.', server.address().port);
});
