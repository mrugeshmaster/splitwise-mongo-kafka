const User = require('../../db/models/User');

const userUpdateImageHandler = async (msg, callback) => {
  const res = {};
  User.findByIdAndUpdate(msg.userId, {
    $set: { image: msg.fileUrl },
  }, {
    new: true,
  }).then((user) => {
    res.status = 200;
    res.data = user.image;
    callback(null, res);
  }).catch((err) => {
    res.status = 500;
    res.data = err;
    callback(null, res);
  });
};

exports.userUpdateImageHandler = userUpdateImageHandler;
