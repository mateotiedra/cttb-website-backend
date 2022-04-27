require('dotenv').config();

module.exports = {
  PRODUCITON: process.env.PRODUCTION === 'true',
  PORT: 8080,
};
