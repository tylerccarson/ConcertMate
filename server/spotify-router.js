let router = require('express').Router();
let axios = require('axios');
let bodyParser = require('body-parser');
let helpers = require('./spotify-helpers.js');

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

router.post('/', bodyParser.json(), (req, res) => {

	console.log(req.body);
	let artist = req.body.artist;
	let userId = req.body.userId;
	let playlistId = req.body.playlistId;

	axios({
		url: `https://api.spotify.com/v1/search?q=${artist}`,
		method: 'get',
		headers: spotifyHeaders
	})
		.then((artistId) => {
			//if they exist, get top tracks for that artist		
			return axios({
				url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
				method: 'get',
				headers: spotifyHeaders
			})
		.then((topTracks) => {
			//need to parse topTracks into an array of trackURI's
			let parsedTrackList = helpers.parseTracks(topTracks);
			//replace playlist tracks with new top tracks
			return axios({
				url: `https://api.spotify.com/v1/users/${userId}/playlists/{playlistId}/tracks`,
				method: 'put',
				headers: spotifyHeaders,
				data: parsedTrackList
			})
		.then((changed) => {
			res.send('got artist post');
			})
		})
	})
});

module.exports = router;