const { Errors } = require('../../constants/Errors');
const { StockAmountToAprove } = require('../../models/stock-amount-to-aprove.model');
const { Stock } = require('../../models/stocks.model');

exports.approveStockAmount = async (req, res, next) => {
  try {
    let { accept, id } = req.body;

    let _stockForApprove = await StockAmountToAprove.findById(id);

    let _stock = await Stock.findById(_stockForApprove.stock);

    if (_stockForApprove.decrease && _stock.amount < _stockForApprove.amount)
      return res.send({ isSuccess: false, status: 403, error: 'Amount is more than the Stock amount' });

    _stockForApprove.status = accept ? 1 : 0;
    _stockForApprove.apprvedBy = req.identity._id;

    await _stockForApprove.save();

    if (accept) {
      _stock.amount = _stockForApprove.decrease ? _stock.amount - Number(_stockForApprove.amount) : _stock.amount + Number(_stockForApprove.amount);

      await _stock.save();
    }

    return res.send({ isSuccess: true, status: 200, data: id });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
