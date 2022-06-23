const { Errors } = require('../../constants/Errors');

const { User } = require('../../models/user.model');

exports.create = async (req, res, next) => {
  try {
    let user = new User({ ...req.body });

    let data = await user.save();
    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
