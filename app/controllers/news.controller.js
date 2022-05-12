const db = require('../models/db.model');
const {
  unexpectedErrorCatch,
  uniqueAttributeErrorCatch,
} = require('../helpers/errorCatch.helper');

const News = db.news;
const Op = db.Sequelize.Op;

// Create a new News (mod and admin only)
const newNews = (req, res) => {
  const id = req.body.title.toLowerCase().replaceAll(' ', '-');
  News.create({
    id: id,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    links: req.body.links,
  })
    .then(() => {
      res.status(200).json({ message: 'News created' });
    })
    .catch(uniqueAttributeErrorCatch(res, unexpectedErrorCatch));
};

const getNewsBoard = (req, res) => {
  return res.status(200).json(req.news.dataValues);
};

const getEveryNewsBoard = (req, res) => {
  const limit = req.prams.limit || 14;
  News.findAll({ limit: limit, order: [['updatedAt', 'DESC']] })
    .then((news) => {
      res.status(200).json(news);
    })
    .catch(unexpectedErrorCatch(res));
};

module.exports = {
  newNews,
  getNewsBoard,
  getEveryNewsBoard,
};
