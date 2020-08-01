const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({dest: './public/res/uploads/'});

const isAdmin = require('../middleware/isAdmin');

const indexGetController = require('../controllers/admin/index/get');
const loginGetController = require('../controllers/admin/auth/get');
const campaignsIndexGetController = require('../controllers/admin/campaigns/index/get');
const campaignsDeleteGetController = require('../controllers/admin/campaigns/delete/get');
const campaignsDetailsGetController = require('../controllers/admin/campaigns/details/get');
const campaignsResultsGetController = require('../controllers/admin/campaigns/results/get');
const paymentsIndexGetController = require('../controllers/admin/payments/index/get');
const paymentsApproveGetController = require('../controllers/admin/payments/approve/get');
const submitionsIndexGetController = require('../controllers/admin/submitions/index/get');
const submitionsApproveGetController = require('../controllers/admin/submitions/approve/get');
const usersIndexGetController = require('../controllers/admin/users/index/get');
const usersDetailsGetController = require('../controllers/admin/users/details/get');

const loginPostController = require('../controllers/admin/auth/post');
const campaignsIndexPostController = require('../controllers/admin/campaigns/index/post');
const campaignsDetailsPostController = require('../controllers/admin/campaigns/details/post');
const campaignsDetailsPhotoPostController = require('../controllers/admin/campaigns/details/photo');
const submitionsRejectPostController = require('../controllers/admin/submitions/reject/post');

router.get(
  '/',
    isAdmin,
    indexGetController
);
router.get(
  '/login',
    loginGetController
);
router.get(
  '/campaigns',
    isAdmin,
    campaignsIndexGetController
);
router.get(
  '/campaigns/delete',
    isAdmin,
    campaignsDeleteGetController
);
router.get(
  '/campaigns/details',
    isAdmin,
    campaignsDetailsGetController
);
router.get(
  '/campaigns/results',
    isAdmin,
    campaignsResultsGetController
);
router.get(
  '/payments',
    isAdmin,
    paymentsIndexGetController
);
router.get(
  '/payments/approve',
    isAdmin,
    paymentsApproveGetController
);
router.get(
  '/submitions',
    isAdmin,
    submitionsIndexGetController
);
router.get(
  '/submitions/approve',
    isAdmin,
    submitionsApproveGetController
);
router.get(
  '/users',
    isAdmin,
    usersIndexGetController
);
router.get(
  '/users/details',
    isAdmin,
    usersDetailsGetController
);

router.post(
  '/login',
    loginPostController
);
router.post(
  '/campaigns',
    upload.single('file'),
    isAdmin,
    campaignsIndexPostController
);
router.post(
  '/campaigns/details',
    isAdmin,
    campaignsDetailsPostController
);
router.post(
  '/campaigns/details/photo',
    upload.single('file'),
    isAdmin,
    campaignsDetailsPhotoPostController
);
router.post(
  '/submitions/reject',
    isAdmin,
    submitionsRejectPostController  
);

module.exports = router;
