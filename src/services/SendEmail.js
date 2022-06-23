const nodemailer = require('nodemailer');

const { Settings } = require('../models/settings.model');

const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

exports.sendEmailForAccountant = async (comment) => {
  try {
    let d = await Settings.findOne({});

    let mailOptions = {
      from: '"ISTSERVERS" <foo@example.com>',
      to: d.accEmail,
      subject: 'New Order',
      html: `
      <h3>New Order is wating for your review</h3>
        <p> Please check your ISTSERVERS dashboard to check the orders </p>
        <hr/>
        <p> ${comment} </p>
      `,
    };

    let info = await mailTransporter.sendMail(mailOptions);

    return;
  } catch (err) {
    return false;
  }
};
