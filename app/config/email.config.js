require('dotenv').config();

module.exports = {
  WEBSITE_NAME: 'cttbernex',
  CONFIRMATION_ROUTE: 'www.cttbernex.com/confirm-email',
  CONTACT_EMAIL: 'contact@cttbernex.com',
  HOST: process.env.MAIL_HOST,
  USER: process.env.MAIL_USER,
  PASSWORD: process.env.MAIL_PASSWORD,
};
