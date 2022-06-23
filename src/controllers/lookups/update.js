const { Errors } = require('../../constants/Errors');
const { Lookup } = require('../../models/lookup.model');

exports.update = async (req, res) => {
  try {
    const { label } = req.body;
    if (!label) return res.send({ isSuccess: false, status: 400, error: Errors.LOOKUP_MISSING_REQUIRED_FIELDS });

    const _lookup = await Lookup.findById(req.params.id);

    _lookup.label = label;

    await _lookup.save();

    return res.send({ isSuccess: true, status: 200, data: req.query.id });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
