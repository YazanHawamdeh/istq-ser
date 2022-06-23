const { Errors } = require('../../constants/Errors');

const { Settings } = require('../../models/settings.model');

exports.updateSettings = async (req, res) => {
  try {
    await Settings.updateOne({}, req.body, { upsert: true, setDefaultsOnInsert: true });

    return res.send({ isSuccess: true, status: 200 });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
