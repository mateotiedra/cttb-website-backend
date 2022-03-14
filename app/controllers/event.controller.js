const config = require('../config/auth.config');
const db = require('../models/db.model');
const {
  unexpectedErrorCatch,
  uniqueAttributeErrorCatch,
} = require('../helpers/errorCatch.helper');
const mailController = require('../controllers/mail.controller');

const Event = db.event;
const Registration = db.registration;
const Op = db.Sequelize.Op;

// Create a new event (admin only)
const newEvent = (req, res) => {
  Event.create({
    id: req.body.id,
    name: req.body.name,
    registrationOpened: req.body.registrationOpened,
    description: req.body.description,
    pdf: req.body.pdf,
    confirmationMessage: req.body.confirmationMessage,
    notifiedEmail: req.body.notifiedEmail,
  })
    .then(() => {
      res.status(200).json({ message: 'Event created' });
    })
    .catch(uniqueAttributeErrorCatch(res, unexpectedErrorCatch(res)));
};

// Get event infos
const getEventBoard = (req, res) => {
  return res.status(200).json(req.event.dataValues);
};

// Add a new registration to an even
const newRegistration = (req, res) => {
  const registrantName = req.body.firstName + ' ' + req.body.lastName;
  Registration.create({
    eventId: req.body.eventId,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    registrationData: req.body.registrationData,
  })
    .then((registration) => {
      mailController
        .sendRegistrationConfirmation({
          email: req.body.email,
          registrantName,
          eventName: req.event.name,
          eventConfMessage: req.event.confirmationMessage,
        })
        .then(() => {
          if (req.event.notifiedEmail) {
            return mailController
              .sendRegistrationNotification({
                notifiedEmail: req.event.notifiedEmail,
                eventName: req.event.name,
                registrantName,
                registration: registration.dataValues,
              })
              .then(() => {
                res.status(200).json({ message: 'Registration created' });
              })
              .catch(unexpectedErrorCatch(res));
          }
          return res.status(200).json({ message: 'Registration created' });
        })
        .catch(unexpectedErrorCatch(res));
    })
    .catch(unexpectedErrorCatch(res));
};

module.exports = {
  newEvent,
  getEventBoard,
  newRegistration,
};
