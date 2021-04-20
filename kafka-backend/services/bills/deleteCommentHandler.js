const Bill = require('../../db/models/BillModel');
const User = require('../../db/models/UserModel');

const deleteCommentHandler = (msg, callback) => {
  const res = {};
  console.log(msg);
  User.findById(msg.userId)
    .then((user) => {
      console.log(user._id);
      Bill
        .findOneAndUpdate({
          groupName: msg.groupName,
          description: msg.description,
        }, {
          $pull: {
            comments: {
              _id: msg.id,
              // user: user._id,
              // comment: msg.comment,
              // commentCreatedAt: msg.commentCreatedAt,
            },
          },
        }, {
          new: true,
        })
        .then((bill) => {
          console.log(bill);
          res.status = 200;
          res.data = 'COMMENT_DELETED';
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

exports.deleteCommentHandler = deleteCommentHandler;
