const config = require('../config/auth.config');
const db = require('../models/db.model');
const { unexpectedErrorCatch } = require('../helpers/errorCatch.helper');
const mailController = require('../controllers/mail.controller');

const Event = db.event;
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
    .catch(unexpectedErrorCatch(res));
};

// Add a new registrant to an even
const newRegistrant = (req, res) => {
  res.status(200).send({ message: 'Registration created' });
};

module.exports = {
  newEvent,
  newRegistrant,
};
