const Activity = require('./models/Activity');

const activityController = (data) => {
  Activity.create({
    activity: data.activity,
    billDescription: data.billDescription,
    paidby: data.paidby,
    users: data.users,
    groupName: data.groupName,
    // collectOrPay: data.collectOrPay,
    // amount: data.amount,
  });
};

exports.activityController = activityController;
