const express = require('express');
const user = require('./user');
const group = require('./group');
const { checkAuth } = require('../../utils/passport');
const userImageUpload = require('./userImageUpload');
const groupImageUpload = require('./groupImageUpload');

const router = express.Router();

router.put(
  '/user',
  checkAuth,
  userImageUpload,
  user,
);

router.put(
  '/group/:groupName',
  checkAuth,
  groupImageUpload,
  group,
);

module.exports = router;
