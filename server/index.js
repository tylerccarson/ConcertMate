const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let db = require('../database/index.js');
let spotifyRouter = require('./spotify-router.js');
let songkickRouter = require('./songkick-router.js');
let googleRouter = require('./google-router.js');

let port = process.env.PORT || 1337;

app.use(express.static(__dirname + '/../client/dist'));

// spotify routes
app.use('/spotify', spotifyRouter);

// songkick routes
app.use('/songkick', songkickRouter);

// google routes
app.use('/google', googleRouter);

app.get('/', (req, res, next) => {
  res.status(200);
  res.end();
});

app.listen(port, () => {
  console.log('Listening on ', port);
});

module.exports = app;