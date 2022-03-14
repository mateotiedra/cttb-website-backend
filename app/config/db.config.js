require('dotenv').config();

module.exports = {
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
