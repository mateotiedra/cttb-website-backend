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
      res.status(200).json({ message: 'News created', id: id });
    })
    .catch(uniqueAttributeErrorCatch(res, unexpectedErrorCatch));
};

const getNewsBoard = (req, res) => {
  let fetchedLinks = req.news.dataValues.links;
  try {
    // Parse a JSON
    fetchedLinks = JSON.parse(fetchedLinks);
  } catch (e) {
    console.log(fetchedLinks, e);
  }
  req.news.dataValues.links = fetchedLinks;
  return res.status(200).json(req.news.dataValues);
};

const getEveryNewsBoard = (req, res) => {
  const limit = req.query && req.query.limit ? parseInt(req.query.limit) : 14;
  News.findAll({ limit: limit, order: [['createdAt', 'DESC']] })
    .then((news) => {
      res.status(200).json(news);
    })
    .catch(unexpectedErrorCatch(res));
};

const updateNews = (req, res) => {
  ['title', 'description', 'links'].forEach((attr) => {
    if (req.body[attr]) req.news[attr] = req.body[attr];
  });
  req.news
    .save()
    .then(() => {
      res.status(200).json(req.news);
    })
    .catch(unexpectedErrorCatch(res));
};

const deleteNews = (req, res) => {
  req.news
    .destroy()
    .then(() => {
      res.status(204).json({ message: 'The news has been deleted' });
    })
    .catch(unexpectedErrorCatch(res));
};

module.exports = {
  newNews,
  getNewsBoard,
  getEveryNewsBoard,
  updateNews,
  deleteNews,
};
