const bcrypt = require('bcrypt');
const User = require('../../db/models/User');

const signUpHandler = async (msg, callback) => {
  const res = {};
  const userExists = await User.findOne({ email: msg.email });
  if (userExists) {
    res.status = 400;
    res.message = 'USER_ALREADY_EXISTS';
    callback(null, res);
  } else {
    const user = new User(msg);
    user.password = bcrypt.hashSync(msg.password, 10);
    try {
      await user.save();
      res.data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        language: user.language,
        currency: user.currency,
        timezone: user.timezone,
        image: user.image,
        _id: user._id,
      };
      res.status = 200;
      callback(null, res);
    } catch (e) {
      res.status = 400;
      callback(null, e);
    }
  }
};

exports.signUpHandler = signUpHandler;
