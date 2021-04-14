/* eslint-disable no-nested-ternary */
const _ = require('lodash');
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
            const sideBarDataTemp = bills.map((bill) => bill.users.map((user) => ({
              name: user.user.name,
              image: user.user.image,
              amount: bill.splitAmount * (user.settled ? 0 : (
                user.collectOrPay === 'COLLECT'
                  ? bill.users.length - 1 : -1
              )),
            })))
              .flat(1);
            const sideBarData = _(sideBarDataTemp)
              .groupBy('name')
              .map((objs, key) => ({
                name: key,
                image: objs[0].image,
                amount: _.sumBy(objs, 'amount'),
              }))
              .value();
            res.status = 200;
            res.data = {
              groupName: group.groupName,
              groupImage: group.groupImage,
              bills,
              sideBarData,
            };
            callback(null, res);
          }
        });
    });
};

exports.getGroupDetailsHandler = getGroupDetailsHandler;
