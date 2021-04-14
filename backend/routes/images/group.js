const kafka = require('../../kafka/client');

module.exports = (req, res) => {
  req.body.path = 'group-update-image';
  if (req.file) {
    req.body.fileUrl = req.file.location;
  }

  kafka.makeRequest('images', req.body, (err, results) => {
    if (err) {
      res.json({
        status: 'error',
        msg: 'System Error, Try Again.',
      });
    } else {
      res.status(200).send(results.message.avatarURL);
    }
  });
};
