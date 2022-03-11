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
  })
    .then(() => {
      res.status(200).send({ message: 'Event created' });
    })
    .catch(uniqueAttributeErrorCatch(res, unexpectedErrorCatch(res)));
};

// Get event infos
const getEventBoard = (req, res) => {
  return res.status(200).send(req.event.dataValues);
};

// Add a new registration to an even
const newRegistration = (req, res) => {
  Registration.create({
    eventId: req.body.eventId,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    registrationData: req.body.registrationData,
  })
    .then(() => {
      res.status(200).send({ message: 'Registration created' });
    })
    .catch(unexpectedErrorCatch(res));
};

module.exports = {
  newEvent,
  getEventBoard,
  newRegistration,
};
