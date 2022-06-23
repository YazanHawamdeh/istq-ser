const { Errors } = require('../../constants/Errors');
const { Stock } = require('../../models/stocks.model');

const fs = require('fs');

exports.create = async (req, res, next) => {
  try {
    let _stock = new Stock({ ...req.body, image: req.fName, createdBy: req.identity._id });

    let data = await _stock.save();

    data.image = `${process.env.IMAGE_LINK}${data.image}`;

    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    if (req.fName) await fs.unlinkSync(`images/${req.fName}`);
    return res.send({ isSuccess: false, status: 500, error: Errors.STOCK_NAME_IS_ALLREADY_EXIST });
  }
};
