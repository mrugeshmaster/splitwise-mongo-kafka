const express = require('express');
const { checkAuth } = require('../../utils/passport');
const addexpense = require('./addexpense');
const settleup = require('./settleup');
const balances = require('./balances');
const addcomment = require('./addcomment');
const deletecomment = require('./deletecomment');

const router = express.Router();

router.post('/addexpense', checkAuth, addexpense);
router.get('/balances', checkAuth, balances);
router.post('/settleup', checkAuth, settleup);
router.post('/comments', checkAuth, addcomment);
router.delete('/comments', checkAuth, deletecomment);

module.exports = router;
