const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true, trim: true },
    amount: { type: Number },
    alertOn: { type: Number, default: 0 },
    description: { type: String },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

exports.Stock = mongoose.model('Stock', schema);
