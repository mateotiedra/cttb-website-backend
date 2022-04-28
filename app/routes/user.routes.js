const {
  verifyAccessToken,
  verifyRole,
} = require('../middlewares/user.middleware');
const { verifyRequestBody } = require('../middlewares/request.middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  // Get the user's basics infos
  app.get('/user/u', [verifyAccessToken], controller.getUserBoard);

  // Get all the users
  app.get(
    '/user/all',
    [verifyAccessToken, verifyRole(['admin'])],
    controller.getEveryUserBoard
  );
};
