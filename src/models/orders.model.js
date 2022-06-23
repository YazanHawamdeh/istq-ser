const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    // type: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    serverTag: { type: String },
    serverIp: { type: String }, //old IP
    // required: { type: String },
    comment: { type: String },
    // orderDate: { type: String },
    // _orderDate: { type: Date },
    // estimationDate: { type: String },
    // _estimationDate: { type: Date },
    dataCenterName: { type: String },
    customerName: { type: String },
    rack: { type: mongoose.Schema.Types.ObjectId, ref: 'Lookup' },
    units: [{ type: Number }],
    iloIp: { type: String },
    iloSwitch: { type: mongoose.Schema.Types.ObjectId, ref: 'Lookup' },
    netWrokSwitch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lookup' }],
    iloSwitchPort: [{ type: Number }],
    networkSwitchPort: [{ type: Number }],
    status: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], default: 1 },
    statusComment: { type: String },
    // workDate: { type: String },
    // _workDate: { type: Date },
    deletedAt: { type: Date, default: null },
    ram: { type: mongoose.Schema.Types.ObjectId, ref: 'Lookup' },
  },
  {
    timestamps: true,
  }
);

exports.Order = mongoose.model('Order', schema);
