const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

const indexGetController = require('../controllers/campaigns/index/get');
const joinGetController = require('../controllers/campaigns/join/get');

router.get(
  '/',
    isLoggedIn,
    indexGetController
);
router.get(
  '/join',
    isLoggedIn,
    joinGetController
);

module.exports = router;
