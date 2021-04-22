const kafka = require('../../kafka/client');

module.exports = (req, res) => {
  req.body.path = 'group-update-image';
  if (req.file) {
    req.body.fileUrl = req.file.location;
  }

  kafka.makeRequest('images', req.body, (err, results) => {
    if (err) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        groupDetails: results.data,
        message: 'IMAGE_UPLOADED',
      }));
    }
  });
};
