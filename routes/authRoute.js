const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

const loginGetController = require('../controllers/auth/login/get');
const registerGetController = require('../controllers/auth/register/get');
const completeGetController = require('../controllers/auth/complete/get');

const loginPostController = require('../controllers/auth/login/post');
const registerPostController = require('../controllers/auth/register/post');
const completePostController = require('../controllers/auth/complete/post');

router.get(
  '/login',
    loginGetController
);
router.get(
  '/register',
    registerGetController
);
router.get(
  '/complete',
    isLoggedIn,
    completeGetController
);

router.post(
  '/login',
    loginPostController
);
router.post(
  '/register',
    registerPostController
);
router.post(
  '/complete',
    isLoggedIn,
    completePostController
);

module.exports = router;
