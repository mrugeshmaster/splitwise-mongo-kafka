const Group = require('../../db/models/Group');

const groupUpdateImageHandler = async (msg, callback) => {
  const res = {};
  Group.findOneAndUpdate(
    { name: msg.groupName },
    { $set: { groupImage: msg.fileUrl } },
    { new: true },
  ).then((group) => {
    res.status = 200;
    res.data = {
      groupImageURL: group.image,
    };
    callback(null, res);
  }).catch((err) => {
    res.status = 500;
    res.data = err;
    callback(null, err);
  });
};

exports.groupUpdateImageHandler = groupUpdateImageHandler;
