/* eslint-disable no-lone-blocks */
const Activity = require('../../db/models/Activity');

const getActivityHandler = async (msg, callback) => {
  const res = {};
  { /*
    count = 5
    pageSize = 2

    limit = 3

    count = 5
    pageSize = 5
    limit = 1

    count = 5
    pageSize = 10

    limit = 1

  */ }
  const filter = msg.groupName
    ? ({ groupName: msg.groupName, user: msg.userId })
    : ({ user: msg.userId });

  const count = await Activity.countDocuments({ user: msg.userId });
  console.log(count, msg.pageSize);
  const options = {
    page: parseInt(msg.page, 10),
    limit: Math.ceil(count / msg.pageSize),
  };
  console.log(Math.ceil(count / msg.pageSize));
  console.log(options);
  Activity.find(filter)
    .sort({ timePosted: msg.order })
    .skip((options.limit * options.page) - options.limit)
    .limit(options.limit)
    .populate({ path: 'user', select: 'name image' })
    .exec((err, activities) => {
      if (err) {
        console.log(err);
        res.status = 500;
        res.message = err;
        callback(null, res);
      } else {
        // console.log(activities);
        res.status = 200;
        res.message = activities;
        callback(null, res);
      }
    });
};

exports.getActivityHandler = getActivityHandler;
