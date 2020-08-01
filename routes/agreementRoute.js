const express = require('express');
const router = express.Router();

const privacyGetController = require('../controllers/agreement/privacy/get');
const userGetController = require('../controllers/agreement/user/get');

router.get(
  '/privacy', 
    privacyGetController
);
router.get(
  '/user',
    userGetController
);

module.exports = router;
