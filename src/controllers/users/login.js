const { Errors } = require('../../constants/Errors');

const { User } = require('../../models/user.model');

const { createJWT } = require('../../services/Tokens');

exports.login = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    let user = await User.findOne({ username: username, deletedAt: null });

    if (user) {
      let isMatched = await user.comparePassword(password);
      if (!isMatched) {
        return res.send({ isSuccess: false, status: 500, error: Errors.USERNAME_OR_PASSWORD_NOT_MATCH });
      } else {
        let { _id, username, role } = user;
        let token = await createJWT({ _id, username, role });
        return res.send({ isSuccess: true, status: 200, data: { _id, username, role, token } });
      }
    } else {
      return res.send({ isSuccess: false, status: 500, error: Errors.USERNAME_NOT_FOUND });
    }
  } catch (err) {
    return res.send({ isSuccess: false, status: 500, error: Errors.SERVER_ERROR });
  }
};
