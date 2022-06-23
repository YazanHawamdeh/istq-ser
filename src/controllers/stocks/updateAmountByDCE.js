const { Errors } = require('../../constants/Errors');
const { StockAmountToAprove } = require('../../models/stock-amount-to-aprove.model');

exports.updateStockForDCE = async (req, res, next) => {
  try {
    let { amount, decrease } = req.body;

    let _stock = new StockAmountToAprove({ stock: req.params.id, amount: amount, decrease: decrease, createdBy: req.identity._id });

    await _stock.save();

    return res.send({ isSuccess: true, status: 200 });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
