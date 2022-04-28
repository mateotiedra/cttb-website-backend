const db = require('../models/db.model');
const {
  unexpectedErrorCatch,
  uniqueAttributeErrorCatch,
} = require('../helpers/errorCatch.helper');

const User = db.user;
const Op = db.Sequelize.Op;

const blackListAttributes = [
  'uuid',
  'emailToken',
  'emailTokenGeneratedAt',
  'password',
];

const filterUserAttributes = (user) => {
  const attributesToSend = Object.keys(User.rawAttributes).filter(
    (attribute) => !blackListAttributes.includes(attribute)
  );

  let userSafeData = {};

  attributesToSend.forEach((attribute) => {
    userSafeData[attribute] = user[attribute];
  });

  return userSafeData;
};

const getUserBoard = (req, res) => {
  const userData = filterUserAttributes(req.user);
  return res.status(200).json(userData);
};

const getEveryUserBoard = (req, res) => {
  User.findAll({ attributes: { exclude: blackListAttributes } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(unexpectedErrorCatch(res));
};

module.exports = {
  getUserBoard,
  getEveryUserBoard,
};
