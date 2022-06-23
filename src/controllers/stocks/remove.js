const { Errors } = require('../../constants/Errors');

const { Stock } = require('../../models/stocks.model');

exports.remove = async (req, res, next) => {
  try {
    await Stock.updateOne({ _id: req.params.id }, { deletedAt: new Date() });

    return res.send({ isSuccess: true, status: 200, data: req.params.id });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
