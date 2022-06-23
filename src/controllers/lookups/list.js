const { Errors } = require('../../constants/Errors');
const { LookupsEnums } = require('../../constants/Lookups');
const { Lookup } = require('../../models/lookup.model');
const { Settings } = require('../../models/settings.model');

exports.list = async (req, res) => {
  try {
    let _data = await Lookup.find({ deletedAt: null }).select({ type: 1, label: 1 });

    let DISKS = [];
    let NETWORK_INTERFACE = [];
    let ILO_SWITCH = [];
    let NETWORK_SWITCH = [];
    let RACK = [];
    let CHASIS = [];
    let RAM = [];
    let CPU = [];

    _data.map((item) => {
      if (item.type == LookupsEnums.DISKS) DISKS.push({ ...item._doc, value: item._id });
      if (item.type == LookupsEnums.NETWORK_INTERFACE) NETWORK_INTERFACE.push({ ...item._doc, value: item._id });
      if (item.type == LookupsEnums.ILO_SWITCH) ILO_SWITCH.push({ ...item._doc, value: item._id });
      if (item.type == LookupsEnums.NETWORK_SWITCH) NETWORK_SWITCH.push({ ...item._doc, value: item._id });
      if (item.type == LookupsEnums.RACK) RACK.push({ ...item._doc, value: item._id });
      if (item.type == LookupsEnums.CHASIS) CHASIS.push({ ...item._doc, value: item._id });
      if (item.type == LookupsEnums.RAM) RAM.push({ ...item._doc, value: item._id });
      if (item.type == LookupsEnums.CPU) CPU.push({ ...item._doc, value: item._id });
    });
    let arr = new Array(50).fill(0);
    let OTHERS = arr.map((item, i) => ({ label: i + 1, value: i + 1 }));

    let SETTIGNS = await Settings.findOne({});

    let data = { DISKS, NETWORK_INTERFACE, ILO_SWITCH, NETWORK_SWITCH, RACK, CHASIS, RAM, CPU, OTHERS, SETTIGNS };
    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
