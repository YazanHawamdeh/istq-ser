const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    stock: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
    amount: { type: Number },
    decrease: { type: Boolean },
    status: { type: Number, enum: [0, 1] }, //0 for decline 1 for uprove
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    apprvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

exports.StockAmountToAprove = mongoose.model('StockAmountToAprove', schema);
