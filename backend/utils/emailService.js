const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Configure the OAuth2 client
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set the refresh token and access token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Function to get a new access token
const getAccessToken = async () => {
  const tokens = await oauth2Client.refreshAccessToken();
  return tokens.credentials.access_token;
};

// Create a transporter using Nodemailer
const createTransporter = async () => {
  const accessToken = await getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_ADDRESS,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
};

// Function to send a verification email
const sendVerificationEmail = async (to, userId) => {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_ADDRESS}>`,
      to: to,
      subject: 'Verify Your Email',
      text: `Please verify your email by clicking the following link: http://yourapp.com/verify-email/${userId}/${generateEmailVerificationToken(userId)}`,
      html: `<p>Please verify your email by clicking the following link: <a href="http://yourapp.com/verify-email/${userId}/${generateEmailVerificationToken(userId)}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', to);
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

// Function to generate an email verification token
const generateEmailVerificationToken = (userId) => {
  // Implement your token generation logic here
  // For example, you can use a hash of the user ID and a secret key
  return 'dummy-token'; // Replace with actual token generation logic
};

module.exports = {
  sendVerificationEmail,
};
