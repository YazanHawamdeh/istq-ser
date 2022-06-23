const { Errors } = require('../../constants/Errors');

const { Stock } = require('../../models/stocks.model');

exports.list = async (req, res) => {
  try {
    let { amuont, name, page, docs } = req.query;

    let limit = parseInt(docs) || 10;

    let skip = (parseInt(page) - 1) * docs || 0;

    let query = { deletedAt: null };

    if (amuont) query.amount = { $gte: Number(amuont[0]), $lte: Number(amuont[1]) };

    if (name) query.name = { $regex: name, $options: 'i' };

    let a = await Stock.find(query).limit(limit).skip(skip).sort({ createdAt: -1 });

    let list = a.map((item) => ({ ...item._doc, image: process.env.IMAGE_LINK + item._doc.image }));

    let total = await Stock.countDocuments(query);

    let maxi = await Stock.find({ deletedAt: null }).sort({ amuont: -1 });

    let max = maxi.reduce((acc, shot) => (acc = acc > shot.amount ? acc : shot.amount), 0);

    return res.send({ isSuccess: true, status: 200, data: { list, total, max: max || 100 } });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
