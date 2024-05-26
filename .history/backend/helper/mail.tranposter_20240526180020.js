export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mailOptions = (userEmail) => {
  return {
    from: process.env.EMAIL_USER,
    to: "recipient-email@example.com",
    subject: "Test Email from Nodemailer",
    text: "Hello, this is a test email sent using Nodemailer!",
    html: "<p>Hello, this is a test email sent using <b>Nodemailer</b>!</p>",
  };
};
