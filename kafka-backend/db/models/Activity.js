const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  activity: {
    type: String,
  },
  user: {
    type: String,
    ref: 'user',
  },
  billDescription: {
    type: String,
  },
  groupName: {
    type: String,
  },
  timePosted: {
    type: Date,
    default: Date.now,
  },
  collectOrPay: {
    type: String,
  },
  amount: {
    type: Number,
  },
},
{
  versionKey: false,
});

module.exports = mongoose.model('activity', activitySchema);
