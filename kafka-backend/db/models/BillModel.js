const mongoose = require('mongoose');

const { Schema } = mongoose;

const billSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  billAmount: {
    type: Number,
    required: true,
  },
  groupName: String,
  paidby: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  splitAmount: Number,
  users: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    settled: Boolean,
    collectOrPay: String,
  }],
  comments: [{
    user: Schema.Types.ObjectId,
    comment: String,
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('bill', billSchema);
