require('dotenv').config();

module.exports = {
  WEBSITE_NAME: 'website_name',
  CONFIRMATION_ROUTE: 'www.example.com/confirm-email',
  CONTACT_EMAIL: 'contact@website.com',
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER,
  PASSWORD: process.env.MAIL_PASSWORD,
};
