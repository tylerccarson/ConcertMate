const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let db = require('../database/index.js');
let spotifyRouter = require('./spotify-router.js');
let songkickRouter = require('./songkick-router.js');

let spotifyCredentials = {
	client_id: '1b4dd6acf0c14120b5fa6ae37b4c773a',
	client_secret: '365aec3923fe452fbbeb31fe842c2a4c',
	redirect_URIs: ['https://concertmate.herokuapp.com/callback', 'http://localhost:8888/callback']
};

let accessToken = 'BQCMwC19LrnRoyhPTiUbi5gFdrFM584B5xcLvVgZrcrlf3cFYEIyxVsVYvpmeK2qCscz9iiBtk_qjm8aKh6a-Q3qyg63LUU0sABKLXswc68Lu9AimAkvu58EEdm53eQrjrvzPI3a0Nxgviuam89CajzKU5Z7emO2NiRI1WH_XG0MIIaT72JUci7mdU6BPsggJ5SbpWwkmgCVbbvtcyR4yIK2gBDH1oZAdYrWPMXaf6QoN_O_V4MhA79thd1Ye1633YvspMzJ7iW6wm5AHj8';

let spotifyHeaders = {
	'Authorization': 'Bearer ' + accessToken,
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
};	

let port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/../client/dist'));

//spotify routes
app.use('/spotify', spotifyRouter);

// songkick routes
app.use('/songkick', songkickRouter);

app.get('/', (req, res, next) => {
  res.status(200);
  res.end();
})

// app.options('/' (req, res) => {
// 	res.header(spotifyHeaders).send();
// })

app.listen(port, () => {
  console.log('Listening on ', port);
});