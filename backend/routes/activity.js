const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../utils/passport');
const kafka = require('../kafka/client');

const router = express.Router();

router.get('/', checkAuth, (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);

  req.body = { ...req.query };
  req.body.path = 'get-activity';
  req.body.userId = decoded.id;

  kafka.makeRequest('activity', req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ activities: results.data }));
    }
  });
});

module.exports = router;
