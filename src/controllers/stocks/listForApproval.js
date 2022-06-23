const { Errors } = require('../../constants/Errors');
const { StockAmountToAprove } = require('../../models/stock-amount-to-aprove.model');

exports.listForApproval = async (req, res, next) => {
  try {
    let { page, docs } = req.query;

    let limit = parseInt(docs) || 10;

    let skip = (parseInt(page) - 1) * docs || 0;

    let query = { apprvedBy: null };

    let data = await StockAmountToAprove.find(query).populate('stock createdBy').sort({ createdAt: -1 });

    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
