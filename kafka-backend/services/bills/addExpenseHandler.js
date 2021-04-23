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
          // console.log(bill.users);
          const users = bill.users.map((user) => (
            {
              user: user.user,
              settled: user.settled,
              collectOrPay: user.collectOrPay,
              amount: bill.splitAmount * (user.settled ? 0 : (
                user.collectOrPay === 'COLLECT'
                  ? bill.users.filter((_user) => _user.settled === false).length - 1 : -1
              )),
            }
          ));
          const data = {
            activity: 'CREATE',
            paidby: bill.paidby,
            billDescription: bill.description,
            groupName: group.groupName,
            users,
          };
          activityController(data);

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
