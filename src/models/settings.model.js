const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    accEmail: { type: String },
    dceEmail: { type: String },
  },
  {
    timestamps: true,
  }
);

exports.Settings = mongoose.model('Settings', schema);
