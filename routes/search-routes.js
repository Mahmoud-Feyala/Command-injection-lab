const express = require('express');
const { getMode } = require('../controllers/mode-controller');
const { createSearchController } = require('../controllers/search-controller');

function createSearchRouter(mode, searchModel) {
  const router = express.Router();
  const searchController = createSearchController(searchModel, mode);

  router.get('/mode', getMode(mode));
  router.get('/search', searchController.search);

  return router;
}

module.exports = { createSearchRouter };
