const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

const indexGetController = require('../controllers/history/get');

router.get(
  '/',
    isLoggedIn,
    indexGetController
);

module.exports = router;
