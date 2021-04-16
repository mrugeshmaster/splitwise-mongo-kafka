const User = require('../../db/models/UserModel');
const Bill = require('../../db/models/BillModel');

const settleUpHandler = (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      console.log(`User: ${user}`);
      Bill
        // .find({ 'users.user': settleUpUser._id })
        .aggregate([
          { $match: { 'users.user': user._id } },
        ])
        .then((bills) => {
          console.log(`Bills :${bills}`);
          res.status = 200;
          res.data = bills;
          callback(null, res);
        }).catch((err) => {
          console.log(err);
          res.status = 200;
          res.data = err;
          callback(null, res);
        });
    });
};

exports.settleUpHandler = settleUpHandler;
