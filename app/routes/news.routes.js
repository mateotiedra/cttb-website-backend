const {
  verifyAccessToken,
  verifyRole,
} = require('../middlewares/user.middleware');
const {
  verifyRequestBody,
  verifyQueryParams,
} = require('../middlewares/request.middleware');
const controller = require('../controllers/news.controller');
const { findNewsByAttribute } = require('../middlewares/finders.middleware');

module.exports = function (app) {
  // Create a new news
  app.post(
    '/news',
    [
      verifyRequestBody(['title']),
      verifyAccessToken,
      verifyRole(['mod', 'admin']),
    ],
    controller.newNews
  );

  // Get the news
  app.get('/news', [findNewsByAttribute('id')], controller.getNewsBoard);

  // Get all the news
  app.get('/news/all', controller.getEveryNewsBoard);

  // Update the news
  app.put('/news', [findNewsByAttribute('id')], controller.updateNews);

  // Delete the news
  app.delete('/news', [findNewsByAttribute('id')], controller.deleteNews);
};
