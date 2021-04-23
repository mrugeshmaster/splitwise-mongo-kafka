const Activity = require('../../db/models/Activity');
const User = require('../../db/models/User');

const getActivityHandler = async (msg, callback) => {
  const res = {};

  User.findById(msg.userId)
    .then(async (user) => {
      const filter = msg.groupName
        ? ({ groupName: msg.groupName, 'users.user': user._id })
        : ({ 'users.user': user._id });
      const count = msg.groupName
        ? (await Activity.countDocuments({ groupName: msg.groupName, 'users.user': user._id }))
        : (await Activity.countDocuments({ 'users.user': msg.userId }));
      const options = {
        sort: msg.order === 'DESC' ? -1 : 1,
        page: count > parseInt(msg.pageSize, 10) ? parseInt(msg.page, 10) : 1,
        limit: parseInt(msg.pageSize, 10),
      };
      Activity
        .aggregate([
          { $match: filter },
          {
            $addFields: {
              users: {
                $filter: {
                  input: '$users',
                  as: 'users',
                  cond: {
                    $eq: ['$$users.user', user._id],
                  },
                },
              },
            },
          },
          {
            $sort: { timePosted: options.sort },
          },
          {
            $skip: (options.limit * options.page) - options.limit,
          },
          {
            $limit: options.limit,
          },
        ]).then((ac) => {
          Activity.populate(ac, [
            {
              path: 'users.user',
              select: 'name image',
            },
            {
              path: 'paidby',
              select: 'name image',
            },
          ]).then((popAc) => {
            res.status = 200;
            res.data = {
              activities: popAc,
              pages: Math.ceil(count / options.limit),
            };
            callback(null, res);
          });
        });
    });
};

exports.getActivityHandler = getActivityHandler;
