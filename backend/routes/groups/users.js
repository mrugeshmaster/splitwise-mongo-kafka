const jwtDecode = require('jwt-decode');
const kafka = require('../../kafka/client');

module.exports = (req, res) => {
  req.body.path = 'get-all-users';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.makeRequest('groups', req.body, (err, results) => {
    if (err) {
      // console.log('Inside err');
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'NO_USERS' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ users: results.data }));
    }
  });
};
