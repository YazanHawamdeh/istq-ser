const { Errors } = require('../../constants/Errors');
const { Stock } = require('../../models/stocks.model');

const fs = require('fs');

exports.update = async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id);
    if (req.body.name) stock.name = req.body.name;
    if (req.body.amount) stock.amount = req.body.amount;
    if (req.body.description) stock.description = req.body.description;
    if (req.body.alertOn) stock.alertOn = req.body.alertOn;
    if (req.fName) stock.image = req.fName;

    let _sotck = await stock.save();

    return res.send({ isSuccess: true, status: 200, data: { ..._sotck._doc, image: process.env.IMAGE_LINK + _sotck._doc.image } });
  } catch (err) {
    await fs.unlinkSync(`images/${req.fName}`);
    return res.send({ isSuccess: false, status: 500, error: Errors.STOCK_NAME_IS_ALLREADY_EXIST });
  }
};
