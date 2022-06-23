const { Errors } = require('../../constants/Errors');
const { Lookup } = require('../../models/lookup.model');

exports.remove = async (req, res, next) => {
  try {
    const _lookup = await Lookup.findOneAndUpdate({ _id: req.params.id }, { deletedAt: new Date() });
    if (!_lookup) return res.send({ isSuccess: false, status: 404, error: Errors.LOOKUP_NOT_FOUND });

    return res.send({ isSuccess: true, status: 200, data: req.params.id });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
