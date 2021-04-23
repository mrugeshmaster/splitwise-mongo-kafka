module.exports = (req, res) => {
  req.body.path = 'group-update-image';
  if (req.file) {
    req.body.fileUrl = req.file.location;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify({
    groupImageURL: req.body.fileUrl,
    message: 'IMAGE_UPLOADED',
  }));
};
