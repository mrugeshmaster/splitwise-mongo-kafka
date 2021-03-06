const bcrypt = require('bcrypt');
const User = require('../../db/models/User');

const loginHandler = async (msg, callback) => {
  const res = {};
  User
    .findOne({ email: msg.email })
    .then((user) => {
      if (!user) {
        res.status = 400;
        callback(null, res);
      } else {
        bcrypt.compare(msg.password, user.password, async (err, match) => {
          if (err) {
            callback(
              null,
              {
                status: 403,
                res: 'BCRYPT_ERROR',
                err,
              },
            );
          }
          if (!match) {
            callback(null, { status: 403, res: 'INCORRECT_PASSWORD' });
          }
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
        });
      }
    }).catch((e) => {
      res.status = 400;
      res.data = e;
      callback(null, res);
    });
};

exports.loginHandler = loginHandler;
