const { Errors } = require('../../constants/Errors');

const { Stock } = require('../../models/stocks.model');

exports.checkAmountLimit = async (req, res) => {
  try {
    // let data = await Stock.$where('this.alertOn >= this.amount');

    let stocks = await Stock.find({});

    let data = stocks
      .filter((item) => item.alertOn >= item.amount)
      .map((item) => ({ ...item._doc, image: process.env.IMAGE_LINK + item._doc.image }));

    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
