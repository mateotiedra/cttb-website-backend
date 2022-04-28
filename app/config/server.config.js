require('dotenv').config();

module.exports = {
  PRODUCTION: process.env.PRODUCTION === 'true',
  PORT: 8080,
};
