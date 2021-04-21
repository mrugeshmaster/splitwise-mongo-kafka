const User = require('../../db/models/User');
const Bill = require('../../db/models/Bill');

const settleUpHandler = (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      User.findOne({ name: msg.settleUpWith })
        .then((settleUpUser) => {
          Bill.updateMany({
            'users.user': user._id,
            'users.collectOrPay': 'PAY',
            paidby: settleUpUser._id,
          }, {
            'users.$.settled': true,
          }, {
            new: true,
          }).then(() => {
            res.status = 200;
            res.data = 'SETTLED_UP';
            callback(null, res);
          });
        })
        .catch((err) => {
          res.status = 404;
          res.data = err;
          callback(null, res);
        });
    });
};

exports.settleUpHandler = settleUpHandler;
