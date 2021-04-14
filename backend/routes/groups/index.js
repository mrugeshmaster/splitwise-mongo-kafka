const express = require('express');
const { checkAuth } = require('../../utils/passport');
const newgroup = require('./newgroup');
const invites = require('./invites');
const memberships = require('./memberships');
const accept = require('./accept');
const reject = require('./reject');
const users = require('./users');
const groupdetails = require('./groupdetails');

const router = express.Router();

router.post('/', checkAuth, newgroup);
router.get('/invites', checkAuth, invites);
router.get('/memberships', checkAuth, memberships);
router.post('/accept', checkAuth, accept);
router.post('/reject', checkAuth, reject);
router.get('/users', checkAuth, users);
router.get('/:groupName', checkAuth, groupdetails);

module.exports = router;
