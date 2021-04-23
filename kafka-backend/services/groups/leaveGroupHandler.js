const User = require('../../db/models/User');
// const Group = require('../../db/models/Group');
const Bill = require('../../db/models/Bill');
const Group = require('../../db/models/Group');

const leaveGroupHandler = async (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      Bill
        .aggregate([
          {
            $match: {
              $and: [
                { 'users.user': user._id },
                { groupName: msg.groupName },
                // { paidby: { $eq: user._id } },
              ],
            },
          },
          {
            $project: {
              groupName: 1,
              description: 1,
              _id: 0,
              users: 1,
            },
          },
          {
            $addFields: {
              usersSettled: {
                $filter: {
                  input: '$users',
                  as: 'users',
                  cond: {
                    $or: [{
                      $and: [
                        { $eq: ['$$users.collectOrPay', 'PAY'] },
                        { $ne: ['paidby', user._id] },
                        { $eq: ['$$users.user', user._id] },
                        { $eq: ['$$users.settled', false] },
                      ],
                    },
                    {
                      // $and: [
                      //   { $eq: ['paidby', user._id] },
                      //   { $eq: ['$$users.collectOrPay', 'PAY'] },
                      //   { $eq: ['$$users.settled', false] },
                      // ],
                    }],
                  },
                },
              },
            },
          },
          {
            $project: {
              groupName: 1,
              description: 1,
              _id: 0,
              users: 1,
              usersSettled: 1,
              notSettledUsers: { $size: '$usersSettled' },
            },
          },
        ]).then((bills) => {
          Bill.populate(bills, [
            { path: 'users.user', select: 'name' },
            { path: 'paidby', select: 'name' },
          ]).then((popBills) => {
            if (popBills.filter((bill) => (bill.notSettledUsers) !== 0).length > 0) {
              res.status = 201;
              res.data = 'GROUP_LEAVE_ERROR';
              callback(null, res);
            } else {
              Group.findOneAndUpdate(
                { groupName: msg.groupName },
                { $pull: { members: user._id } },
                { new: true },
              )
                .then(async (group) => {
                  await User.findByIdAndUpdate(msg.userId,
                    { $pull: { memberships: group._id } }, { new: true })
                    .then((result) => {
                      if (result) {
                        res.status = 200;
                        res.data = 'GROUP_LEAVE_SUCCESS';
                        callback(null, res);
                      } else {
                        res.status = 404;
                        res.data = 'GROUP_NOT_FOUND';
                        callback(null, res);
                      }
                    });
                });
            }
          });
        });
    }).catch((err) => {
      res.status = 400;
      res.data = err;
      callback(null, res);
    });
};

exports.leaveGroupHandler = leaveGroupHandler;
