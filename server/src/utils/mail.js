const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter with the correct settings for Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address from .env file
      pass: process.env.GMAIL_PASSWORD // Your Google App Password from .env file
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: `ShowMax <${process.env.GMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
