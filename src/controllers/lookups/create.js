const { Errors } = require('../../constants/Errors');
const { Lookup } = require('../../models/lookup.model');

exports.create = async (req, res, next) => {
  try {
    const { type, label } = req.body;
    if (!type || !label) return res.send({ isSuccess: false, status: 400, error: Errors.LOOKUP_MISSING_REQUIRED_FIELDS });
    let _lookup = new Lookup({ type, label });
    let data = await _lookup.save();
    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
