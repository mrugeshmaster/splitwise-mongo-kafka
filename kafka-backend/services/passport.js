const User = require('../db/models/User');

const passportHandler = async (msg, callback) => {
  const res = {};
  try {
    const { userId } = msg;
    const user = await User.findById(userId);
    if (!user) {
      res.status = 404;
      callback(null, res);
    } else {
      res.status = 200;
      res.data = JSON.stringify(user);
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

function handleRequest(msg, callback) {
  passportHandler(msg, callback);
}
exports.handleRequest = handleRequest;
