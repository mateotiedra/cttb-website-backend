const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB_CONNECTION_URL, {
  dialect: config.DIALECT,
});
/* const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,

  pool: {
    max: config.POOL.max,
    min: config.POOL.min,
    acquire: config.POOL.acquire,
    idle: config.POOL.idle,
  },
}); */

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.event = require('./event.model.js')(sequelize, Sequelize);
db.registration = require('./registration.model.js')(sequelize, Sequelize);

db.event.associate(db);
db.registration.associate(db);
/*db.bid = require('./bid.model.js')(sequelize, Sequelize);

db.user.associate(db);
db.bid.associate(db); */

module.exports = db;
