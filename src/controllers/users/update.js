const { Errors } = require('../../constants/Errors');

const { User } = require('../../models/user.model');

exports.update = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = req.body.password;
    if (req.body.role) user.role = req.body.role;

    await user.save();
    return res.send({ isSuccess: true, status: 200, data: req.params.id });
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
