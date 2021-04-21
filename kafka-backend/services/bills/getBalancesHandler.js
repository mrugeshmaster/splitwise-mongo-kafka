const _ = require('lodash');
const User = require('../../db/models/User');
const Bill = require('../../db/models/Bill');

const getBalancesHandler = (msg, callback) => {
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
              ],
            },
          },
          {
            $project: {
              splitAmount: 1,
              description: 1,
              paidby: 1,
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
                  { $match: { $and: [{ 'users.user': user._id }, { paidby: { $eq: user._id } }] } },
                  {
                    $project: {
                      splitAmount: 1,
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
                    res.status = 200;
                    const payBalance = populatedPayBills
                      .map((payBill) => (payBill.users.length > 0 ? payBill.splitAmount : 0))
                      .reduce((a, b) => a + b, 0);

                    populatedPayBills = populatedPayBills
                      .map((bill) => (bill.users.length > 0 ? ({
                        name: bill.paidby.name,
                        image: bill.paidby.image,
                        amount: bill.splitAmount,
                      }) : {}));

                    const finalPayBills = _(populatedPayBills)
                      .filter((obj) => _.has(obj, 'name'))
                      .groupBy('name')
                      .map((objs, key) => ({
                        name: key,
                        image: objs[0].image,
                        amount: _.sumBy(objs, 'amount'),
                      }))
                      .value();

                    populatedCollectBills = populatedCollectBills
                      .map((eachBill) => eachBill.users.map((eachUser) => ({
                        name: eachUser.user.name,
                        image: eachUser.user.image,
                        amount: eachBill.splitAmount,
                      }))).flat(1);

                    const finalCollectBills = _(populatedCollectBills)
                      .groupBy('name')
                      .map((objs, key) => ({
                        name: key,
                        image: objs[0].image,
                        amount: _.sumBy(objs, 'amount'),
                      }))
                      .value();

                    const collectBalance = finalCollectBills
                      .map((collectBill) => collectBill.amount)
                      .reduce((a, b) => a + b, 0);

                    const data = {
                      payBills: finalPayBills,
                      collectBills: finalCollectBills,
                      payBalance,
                      collectBalance,
                      totalBalance: collectBalance - payBalance,
                    };
                    res.data = data;
                    callback(null, res);
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

exports.getBalancesHandler = getBalancesHandler;
