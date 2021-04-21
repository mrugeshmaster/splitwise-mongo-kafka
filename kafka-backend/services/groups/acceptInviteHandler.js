const Group = require('../../db/models/Group');
const User = require('../../db/models/User');

const acceptInviteHandler = async (msg, callback) => {
  const res = {};

  Group.findOneAndUpdate(
    { groupName: msg.groupName },
    { $push: { members: msg.userId } },
  ).then(async (group) => {
    await User.findByIdAndUpdate(msg.userId,
      {
        $pull: { invitations: group._id },
        $push: { memberships: group._id },
      })
      .then((result) => {
        if (result) {
          res.status = 200;
          res.data = 'INVITE_ACCEPTED';
          callback(null, res);
        }
      })
      .catch((e) => {
        res.status = 400;
        res.data = e;
        callback(null, res);
      });
  }).catch((e) => {
    res.status = 400;
    res.data = e;
    callback(null, res);
  });
};

exports.acceptInviteHandler = acceptInviteHandler;
