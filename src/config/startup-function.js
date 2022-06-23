const { User } = require('../models/user.model');

exports.startUpFunction = async () => {
  let user = await User.findOne({ role: 1 });

  if (user) return;

  user = new User({ username: 'Admin', password: 123123, role: 1 });

  await user.save();
  let data = await User.findOne({ role: 1 });
  return;
};
