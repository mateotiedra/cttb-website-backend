const { verifyAccessToken } = require('../middlewares/user.middleware');
const { verifyRequestBody } = require('../middlewares/request.middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  // Get the user's basics infos
  app.get('/auth/u', [verifyAccessToken], controller.getUserBoard);
};
