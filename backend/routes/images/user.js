const jwtDecode = require('jwt-decode');
const kafka = require('../../kafka/client');

module.exports = (req, res) => {
  req.body.path = 'user-update-image';
  if (req.file) {
    req.body.fileUrl = req.file.location;
  }
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);
  req.body.userId = decoded.id;

  kafka.makeRequest('images', req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        image: results.data,
        message: 'PROFILE_UPDATE_IMAGE_SUCCESS',
      }));
    }
  });
};
