const { Errors } = require('../../constants/Errors');

const { User } = require('../../models/user.model');

exports.list = async (req, res) => {
  try {
    let data = await User.find({ deletedAt: null }).select({ username: 1, role: 1 });
    return res.send({ isSuccess: true, status: 200, data });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
