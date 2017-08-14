let router = require('express').Router();
let axios = require('axios');
let bodyParser = require('body-parser');
let helpers = require('./spotify-helpers.js');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
//let SpotifyWebApi = require('spotify-web-api-node');

let spotifyCredentials = {
	client_id: '1b4dd6acf0c14120b5fa6ae37b4c773a',
	client_secret: '365aec3923fe452fbbeb31fe842c2a4c',
	redirect_uri: 'http://localhost:8888/'
};

let accessToken = 'BQAnLXpx66YRPtPjKUKXsqZ8VaT6iBIAfD7CpxDVI7Z5dTrWwSEq2S-59HgTB7NGbm-N_w_-MkpJ-B04S0Msph2OpSYDmA_ZO-Izp5iGlj7QvskY9wBksnCzOKN1kuqYaLrwdKuWCKlba3m7hLRINhz1hRgTR3aPr6ZDXosJu1xostwbi3NtXRF_2zbhTzUX493r5ltcROhahqAXlpcGVZhl4rcD2RVLHqIgmxV2eJNyxbnCgrDvkRHQDNHzlegxX8yqU6w9tltSuW_GB6M';

let spotifyHeaders = {
	'Authorization': 'Bearer ' + accessToken,
	'Accept': 'application/json'
};

let scopes = ['user-read-private', 'user-read-email'];

//start authentication flow on refresh
router.get('/login', (req, res) => {
	let encodedClientId = encodeURIComponent(spotifyCredentials.client_id)
	let encodedRedirectURI = encodeURIComponent(spotifyCredentials.redirect_uri);
	let authorizeURL = `https://accounts.spotify.com/authorize?client_id=${encodedClientId}&redirect_uri=${encodedRedirectURI}&scope=user-read-private%20user-read-email&response_type=token`;
	console.log(authorizeURL);
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send(authorizeURL);

	// axios approach
	// axios.get('https://accounts.spotify.com/authorize', {
	// 	params: {
	// 		client_id: spotifyCredentials.client_id,
	// 		response_type: 'token',
	// 		redirect_uri: spotifyCredentials.redirect_uri
	// 	}
	// })
	// .then((response) => {
	// 	console.log(response);
	// })
	// .catch((error) => {
	// 	console.log(error);
	// })
	// .then(() => {
	// 	res.send('Authorization attempted');
	// })

});

//callback route
// router.get('/callback', (req, res) => {
// 	console.log('callback yo: ', req);
// 	axios.get('http://localhost:8888');
// })

//handle playlist search submission
router.post('/', bodyParser.json(), (req, res) => {
	let artist = encodeURI(req.body.artist);

	axios({
		url: `https://api.spotify.com/v1/search?q=${artist}&type=playlist&market=US&limit=10`,
		method: 'get',
		headers: spotifyHeaders
	})
	//maybe need to do a req, res, with chaining request? Look it up.
	.then((playlists) => {
		//console.log('playlists: ', playlists.body);
		//eventually, send the playlist ID back up to the client
		res.status(200).send('daaaata')
	})
	.catch((error) => {
		//console.log('Error getting API data: ', error);
		res.status(404).send('Error');
	});


	// 	.then((artistId) => {
	// 		//if they exist, get top tracks for that artist		
	// 		return axios({
	// 			url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
	// 			method: 'get',
	// 			headers: spotifyHeaders
	// 		})
	// 	.then((topTracks) => {
	// 		//need to parse topTracks into an array of trackURI's
	// 		let parsedTrackList = helpers.parseTracks(topTracks);
	// 		//replace playlist tracks with new top tracks
	// 		return axios({
	// 			url: `https://api.spotify.com/v1/users/${userId}/playlists/{playlistId}/tracks`,
	// 			method: 'put',
	// 			headers: spotifyHeaders,
	// 			data: parsedTrackList
	// 		})
	// 	.then((changed) => {
	// 		res.send('got artist post');
	// 		})
	// 	})
	// })
});

module.exports = router;