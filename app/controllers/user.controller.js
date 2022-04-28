const db = require('../models/db.model');
const {
  unexpectedErrorCatch,
  uniqueAttributeErrorCatch,
} = require('../helpers/errorCatch.helper');

const User = db.user;
const Op = db.Sequelize.Op;

const getUserBoard = (req, res) => {
  const attributesToSend = ['email', 'status', 'role'];
  let userData = {};

  attributesToSend.forEach((attribute) => {
    userData[attribute] = req.user[attribute];
  });

  return res.status(200).json(userData);
};

module.exports = {
  getUserBoard,
};
