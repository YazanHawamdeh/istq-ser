const { User } = require('../models/user.model');
const { getTokenFromHeader } = require('./Tokens');
const { Errors } = require('../constants/Errors');

exports.isAuth = async (req, res, next) => {
  try {
    let { success, _id, username, role, token } = await getTokenFromHeader(req);
    if (!success) return res.send({ isSuccess: false, status: 401, error: Errors.USER_NOT_ALLOWED });
    let user = await User.findById(_id);
    if (!user || user.deletedAt) return res.send({ isSuccess: false, status: 401, error: Errors.USER_NOT_ALLOWED });
    req.identity = { _id, username, role, token };
    return next();
  } catch (err) {
    return res.send({ isSuccess: false, status: 401, error: Errors.USER_NOT_ALLOWED });
  }
};
