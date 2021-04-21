/* eslint-disable no-nested-ternary */
const Group = require('../../db/models/Group');
const Bill = require('../../db/models/Bill');
const { activityController } = require('../../db/activityController');

const addExpenseHandler = (msg, callback) => {
  const res = {};
  Group.findOne({ groupName: msg.groupName })
    .then(async (group) => {
      const userObj = group.members.map((member) => ({
        user: member,
        settled: false,
        collectOrPay: JSON.stringify(msg.userId) === JSON.stringify(member) ? 'COLLECT' : 'PAY',
      }));
      Bill.create({
        description: msg.description,
        billAmount: msg.billAmount,
        groupName: group.groupName,
        paidby: msg.userId,
        splitAmount: msg.billAmount / group.members.length,
        users: userObj,
      }, (err, bill) => {
        if (err) {
          res.status = 400;
          res.data = err;
          callback(null, res);
        } else if (bill) {
          bill.users.map((user) => {
            const data = {
              activity: 'CREATE',
              user: user.user,
              billDescription: bill.description,
              groupName: group.groupName,
              collectOrPay: user.collectOrPay,
              amount: bill.splitAmount * (user.settled ? 0 : (
                user.collectOrPay === 'COLLECT'
                  ? bill.users.filter((_user) => _user.settled === false).length - 1 : -1
              )),
            };
            activityController(data);
          });
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
