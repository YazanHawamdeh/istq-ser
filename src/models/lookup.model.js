const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: [1, 2, 3, 4, 5, 6, 7, 8] },
    label: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

exports.Lookup = mongoose.model('Lookup', schema);
