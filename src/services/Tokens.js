const { sign, verify } = require('jsonwebtoken');

exports.createJWT = (payload) => {
  let { _id, username, role } = payload;
  return `Bearer ${sign({ _id, username, role }, process.env.ACCESS_TOKEN_SECRET)}`;
};

exports.getTokenFromHeader = async (req) => {
  const autherization = req.headers.authorization;

  if (!autherization) return { success: false };

  let token = autherization.split(' ')[1];

  if (!token) return { success: false };

  let { _id, username, role } = await verify(token, process.env.ACCESS_TOKEN_SECRET);

  return { success: true, _id, username, role, token: autherization };
};
