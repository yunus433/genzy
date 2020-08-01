const express = require('express');
const router = express.Router();

const indexGetController = require('../controllers/brand/get');

const indexPostController = require('../controllers/brand/post');

router.get(
  '/', 
    indexGetController
);

router.post(
  '/',
    indexPostController
);

module.exports = router;
