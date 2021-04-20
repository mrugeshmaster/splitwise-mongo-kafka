const Bill = require('../../db/models/BillModel');

const deleteCommentHandler = (msg, callback) => {
  const res = {};
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
};

exports.deleteCommentHandler = deleteCommentHandler;
