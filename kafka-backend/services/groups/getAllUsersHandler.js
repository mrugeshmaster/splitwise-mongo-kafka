const User = require('../../db/models/User');

const getAllUsersHandler = async (msg, callback) => {
  const res = {};
  User
    .find({ _id: { $ne: msg.userId } }, { _id: 0, name: 1, email: 1 })
    .then((result) => {
      if (result.length > 0) {
        res.status = 200;
        res.data = [...result];
        callback(null, res);
      } else {
        res.status = 404;
        callback(null, res);
      }
    })
    .catch((e) => {
      res.status = 404;
      res.data = e;
      callback(null, res);
    });
};

exports.getAllUsersHandler = getAllUsersHandler;
