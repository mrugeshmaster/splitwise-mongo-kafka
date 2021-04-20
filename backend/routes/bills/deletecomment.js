const jwtDecode = require('jwt-decode');
const kafka = require('../../kafka/client');

module.exports = (req, res) => {
  req.body.path = 'delete-comment';
  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;
  console.log(req.body);
  kafka.makeRequest('bills', req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        message: results.data,
      }));
    }
  });
};
