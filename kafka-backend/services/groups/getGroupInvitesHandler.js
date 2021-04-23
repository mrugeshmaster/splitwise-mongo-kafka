const User = require('../../db/models/User');
const Group = require('../../db/models/Group');

const getGroupInvitesHandler = (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      Group.find({ _id: { $in: user.invitations } }, { groupName: 1, groupImage: 1 })
        .then((groups) => {
          if (groups.length > 0) {
            res.status = 200;
            res.data = groups;
            callback(null, res);
          } else {
            res.status = 404;
            res.data = 'NO_INVITATIONS';
            callback(null, res);
          }
        })
        .catch((e) => {
          res.status = 404;
          callback(null, e);
        });
    })
    .catch((e) => {
      res.status = 404;
      callback(null, e);
    });
};

exports.getGroupInvitesHandler = getGroupInvitesHandler;
