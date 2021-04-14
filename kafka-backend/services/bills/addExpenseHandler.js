const Group = require('../../db/models/GroupModel');
const Bill = require('../../db/models/BillModel');

const addExpenseHandler = (msg, callback) => {
  const res = {};
  Group.findOne({ groupName: msg.groupName })
    .then(async (group) => {
      const userObj = group.members.map((member) => ({
        user: member,
        settled: false,
        collectOrPay: JSON.stringify(msg.userId) === JSON.stringify(member) ? 'COLLECT' : 'PAY',
      }));
      await Bill.create({
        description: msg.description,
        billAmount: msg.billAmount,
        groupName: group.groupName,
        paidby: msg.userId,
        splitAmount: msg.billAmount / group.members.length,
        users: userObj,
      }, (err, result) => {
        if (err) {
          res.status = 400;
          res.data = err;
          callback(null, res);
        } else if (result) {
          res.status = 200;
          res.data = 'BILL_CREATED';
          callback(null, res);
        }
      });
    }).catch((err) => {
      res.status = 400;
      res.data = err;
      callback(null, res);
    });
};

exports.addExpenseHandler = addExpenseHandler;
