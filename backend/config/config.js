require('dotenv').config();

const config = {
  // Application settings
  app: {
    name: process.env.APP_NAME || 'ImageboardApp',
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
  },

  // Database settings
  db: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // JWT settings
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },

  // AWS S3 settings
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3BucketName: process.env.AWS_S3_BUCKET_NAME,
  },

  // Email settings
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    address: process.env.EMAIL_ADDRESS,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  },

  // Other settings
  other: {
    // Add any other configuration settings here
  },
};

module.exports = config;
