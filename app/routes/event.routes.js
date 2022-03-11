const { verifyRequestBody } = require('../middlewares/request.middleware');
const controller = require('../controllers/event.controller');
const {
  verifyAccessToken,
  verifyRole,
} = require('../middlewares/user.middleware');

module.exports = function (app) {
  // Create a new event
  app.post(
    '/event/new',
    [
      verifyRequestBody(['id', 'name']),
      verifyAccessToken,
      verifyRole(['mod', 'admin']),
    ],
    controller.newEvent
  );

  // Register someone to an event
  app.post(
    '/event/register',
    [
      verifyRequestBody([
        'eventId',
        'email',
        'firstName',
        'lastName',
        'registrationData',
      ]),
    ],
    controller.newRegistration
  );
};
