const User = require('../../db/models/UserModel');
const Bill = require('../../db/models/BillModel');

const settleUpHandler = (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      console.log(`User: ${user}`);
      User.findOne({ name: msg.settleUpWith })
        .then((settleUpUser) => {
          console.log(settleUpUser);
          Bill.updateMany({
            'users.user': user._id,
            'users.collectOrPay': 'PAY',
            paidby: settleUpUser._id,
          }, {
            'users.$.settled': true,
          }, {
            new: true,
          }).then((bills) => {
            console.log(bills);
            res.status = 200;
            res.data = 'SETTLED_UP';
            callback(null, res);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status = 404;
          res.data = err;
          callback(null, res);
        });
    });
};

exports.settleUpHandler = settleUpHandler;
