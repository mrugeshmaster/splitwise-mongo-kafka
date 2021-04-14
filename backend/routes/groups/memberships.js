const jwtDecode = require('jwt-decode');
const kafka = require('../../kafka/client');

module.exports = (req, res) => {
  req.body.path = 'get-groups-memberships';

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
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      console.log(`member: ${JSON.stringify(results)}`);
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
      // return res.status(201).json({ errors: [{ message: 'System Error' }] });
    } else {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        groupMemberships: results.data,
      }));
      // res.status(200).send(JSON.parse(results.data));
    }
  });
};
