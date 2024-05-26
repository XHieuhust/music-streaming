const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = (userEmail, message) => {
  return {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Người bạn theo dõi đã đăng một bài hát mới",
    text: `${message}`,
    html: "<p>Hello, this is a test email sent using <b>Nodemailer</b>!</p>",
  };
};

module.exports = { transporter, mailOptions };