const Bill = require('../../db/models/Bill');
const User = require('../../db/models/User');
const { activityController } = require('../../db/activityController');

const addCommentHandler = (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      Bill
        .findOneAndUpdate({
          groupName: msg.groupName,
          description: msg.description,
        }, {
          $push: {
            comments: {
              user: user._id,
              comment: msg.comment,
            },
          },
        }, {
          new: true,
        })
        .then((bill) => {
          const data = {
            activity: 'UPDATE',
            paidby: user._id,
            billDescription: bill.description,
            groupName: bill.groupName,
            users: bill.users,
          };
          activityController(data);

          res.status = 200;
          res.data = 'COMMENT_CREATED';
          callback(null, res);
        }).catch((err) => {
          res.status = 400;
          res.data = err;
          callback(null, res);
        });
    }).catch((err) => {
      res.status = 400;
      res.data = err;
      callback(null, res);
    });
};

exports.addCommentHandler = addCommentHandler;
