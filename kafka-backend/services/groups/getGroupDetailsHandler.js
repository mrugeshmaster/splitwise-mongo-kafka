const Group = require('../../db/models/GroupModel');
const Bill = require('../../db/models/BillModel');

const getGroupDetailsHandler = (msg, callback) => {
  const res = {};
  Group.findOne({ groupName: msg.groupName })
    .then(async (group) => {
      await Bill.find({ groupName: msg.groupName })
        .populate({ path: 'users.user', select: 'name image' })
        .populate({ path: 'paidby', select: 'name image' })
        .exec(async (err, bills) => {
          if (err) {
            res.status = 404;
            res.data = err;
            callback(null, res);
          }
          if (!bills.length) {
            res.status = 200;
            res.data = {
              groupName: group.groupName,
              groupImage: group.groupImage,
            };
            await callback(null, res);
          } else {
            res.status = 200;
            res.data = {
              groupName: group.groupName,
              groupImage: group.groupImage,
              bills,
            };
            callback(null, res);
          }
        });
    });
};

exports.getGroupDetailsHandler = getGroupDetailsHandler;
