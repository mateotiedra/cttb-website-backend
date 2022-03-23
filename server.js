require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');

var whitelist = [
  'https://cttbernex.ch',
  'https://www.cttbernex.ch',
  'http://cttbernex.ch',
  'http://www.cttbernex.ch',
];

if (process.env.PRODUCTION === 'false') {
  whitelist.push('http://localhost:3000');
  whitelist.push('https://localhost:3000');
}

console.log(whitelist);

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// Use express-rate-limit to prevent too many requests
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Use helmet for security
const helmet = require('helmet');
app.use(helmet());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());

// Database
const db = require('./app/models/db.model');

// True to set the database for the first time or reset it
const resetDB = false;
db.sequelize.sync({ force: resetDB }).then(() => {
  if (resetDB) {
    console.log('Drop and Resync Database with { force: true }');
    initial();
  }
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the api.' });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/event.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {}
