const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const helmet = require ('helmet');

// const users = require ('./routes/api/users');

const app = express ();

// Body parser middleware
app.use (bodyParser.urlencoded ({extended: false}));
app.use (bodyParser.json ());
app.set ('views', path.join (__dirname, 'views'));

// helmet
app.use (helmet ());

app.use (
  cors ({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.all ('/*', function (req, res, next) {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header ('Access-Control-Allow-Headers', 'X-Requested-With');
  next ();
});

app.use (function (err, req, res, next) {
  res.status (500).send ('Something wrong broke!');
  console.log (err);
});

// DB Config
const db = require ('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect (db)
  .then (() => console.log ('MongoDB Connected'))
  .catch (err => console.log (err));

const port = process.env.PORT || 10000;

//Use routes
// app.use ('/api/users', users);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use (express.static ('client/build'));

  app.get ('*', (req, res) => {
    res.sendFile (path.resolve (__dirname, 'client', 'build', 'index.html'));
  });
}

app.get ('/', (req, res) => {
  res.json ({
    message: 'Welcome to Enye coding challenge',
  });
});

app.listen (port, () => console.log (`Server running on port ${port}`));
