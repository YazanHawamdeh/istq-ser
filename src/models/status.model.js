const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    prevStatus: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    nextStatus: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    comment: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

exports.StatusLogs = mongoose.model('StatusLogs', schema);
