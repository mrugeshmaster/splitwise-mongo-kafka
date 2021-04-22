const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
  activity: {
    type: String,
  },
  paidby: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  users: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    settled: Boolean,
    collectOrPay: String,
    amount: Number,
  }],
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
