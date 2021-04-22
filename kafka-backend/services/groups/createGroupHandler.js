const Group = require('../../db/models/Group');
const User = require('../../db/models/User');

const createGroupHandler = async (msg, callback) => {
  const res = {};
  const groupExists = await Group.findOne({ groupName: msg.groupName });
  if (groupExists) {
    res.status = 400;
    callback(null, res);
  } else {
    Group.create({
      groupName: msg.groupName, members: [msg.userId], groupImage: msg.groupImage,
    }, (groupErr, group) => {
      if (groupErr) {
        res.status = 404;
        callback(null, res);
      }
      User.findById(msg.userId)
        .then(async (user) => {
          await user.memberships.push(group._id);
          await user.save();
        });
      msg.invitedMembers.map((invitedMemberEmail) => {
        User.findOneAndUpdate(
          { email: invitedMemberEmail },
          { $push: { invitations: group._id } },
          async (err) => {
            if (err) {
              res.status = 404;
              res.data = err;
              callback(null, res);
            }
          },
        );
      });
      res.data = JSON.stringify(group);
      res.status = 200;
      callback(null, res);
    });
  }
};

exports.createGroupHandler = createGroupHandler;
