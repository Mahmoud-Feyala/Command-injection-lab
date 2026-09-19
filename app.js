const express = require('express');
const path = require('path');
const { createSearchRouter } = require('./routes/search-routes');

function createApp(mode, searchModel) {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(createSearchRouter(mode, searchModel));

  return app;
}

module.exports = { createApp };
