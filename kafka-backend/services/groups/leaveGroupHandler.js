/* eslint-disable no-nested-ternary */
const User = require('../../db/models/User');
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
                { paidby: { $ne: user._id } },
                { groupName: msg.groupName },
              ],
            },
          },
          {
            $project: {
              users: {
                $filter: {
                  input: '$users',
                  as: 'users',
                  cond: {
                    $and: [
                      { $eq: ['$$users.collectOrPay', 'PAY'] },
                      { $eq: ['$$users.user', user._id] },
                      { $eq: ['$$users.settled', false] },
                    ],
                  },
                },
              },
            },
          },
        ])
        .then((payBills) => {
          Bill.populate(payBills, [
            { path: 'paidby', select: 'name image -_id' },
            { path: 'users.user', select: 'name image -_id' },
          ])
            .then((populatedPayBills) => {
              Bill
                .aggregate([
                  {
                    $match: {
                      $and: [
                        { 'users.user': user._id },
                        { paidby: { $eq: user._id } },
                        { groupName: msg.groupName },
                      ],
                    },
                  },
                  {
                    $project: {
                      users: {
                        $filter: {
                          input: '$users',
                          as: 'users',
                          cond: {
                            $and: [
                              { $eq: ['$$users.collectOrPay', 'PAY'] },
                              { $eq: ['$$users.settled', false] },
                            ],
                          },
                        },
                      },
                    },
                  },
                ]).then((collectBills) => {
                  Bill.populate(collectBills, [
                    { path: 'users.user', select: 'name image -_id' },
                  ]).then((populatedCollectBills) => {
                    const payUsersSettled = populatedPayBills.length > 0
                      ? populatedPayBills
                        .find((bill) => (bill.users.length === 0)).users.length === 0
                        ? 0 : -1 : 0;
                    const collectUsersSettled = populatedCollectBills.length > 0
                      ? populatedCollectBills
                        .find((bill) => (bill.users.length === 0))
                        ? 0 : -1 : 0;
                    if (payUsersSettled === 0 && collectUsersSettled === 0) {
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
                    } else {
                      res.status = 201;
                      res.data = 'GROUP_LEAVE_ERROR';
                      callback(null, res);
                    }
                  });
                });
            });
        }).catch((err) => {
          res.status = 404;
          res.data = err;
          callback(null, res);
        });
    }).catch((err) => {
      res.status = 404;
      res.data = err;
      callback(null, res);
    });
};

exports.leaveGroupHandler = leaveGroupHandler;
