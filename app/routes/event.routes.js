const { verifyRequestBody } = require('../middlewares/request.middleware');
const controller = require('../controllers/event.controller');
const {
  verifyAccessToken,
  verifyRole,
} = require('../middlewares/user.middleware');
const { findEventByAttribute } = require('../middlewares/finders.middleware');

module.exports = function (app) {
  // Create a new event
  app.post(
    '/event',
    [
      verifyRequestBody(['id', 'name']),
      verifyAccessToken,
      verifyRole(['mod', 'admin']),
    ],
    controller.newEvent
  );

  app.get('/event', [findEventByAttribute('id')], controller.getEventBoard);

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
      findEventByAttribute('id', 'eventId'),
    ],
    controller.newRegistration
  );
};
