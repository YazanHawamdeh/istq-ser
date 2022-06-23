const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: Number, enum: [1, 2, 3] }, //check constants folder for details=>db-enums.js
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    let salt = bcrypt.genSaltSync(5);
    let hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

schema.methods.comparePassword = async function (password) {
  let isEqual = await bcrypt.compareSync(password, this.password);
  return isEqual;
};

exports.User = mongoose.model('User', schema);
