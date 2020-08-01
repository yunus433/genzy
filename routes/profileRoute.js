const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn');

const indexGetController = require('../controllers/profile/index/get');
const paymentGetController = require('../controllers/profile/payment/get');
const logoutGetController = require('../controllers/profile/logout/get');

const indexPostController = require('../controllers/profile/index/post');
const paymentPostController = require('../controllers/profile/payment/post');

router.get(
  '/',
    isLoggedIn,
    indexGetController
);
router.get(
  '/payment',
    isLoggedIn,
    paymentGetController
);
router.get(
  '/logout',
    isLoggedIn,
    logoutGetController
);

router.post(
  '/',
    isLoggedIn,
    indexPostController
);
router.post(
  '/payment',
    isLoggedIn,
    paymentPostController
);

module.exports = router;
