let router = require('express').Router();
let axios = require('axios');
let bodyParser = require('body-parser');
let helpers = require('./spotify-helpers.js');
let SpotifyWebApi = require('spotify-web-api-node');

let spotifyCredentials = {
	client_id: '1b4dd6acf0c14120b5fa6ae37b4c773a',
	client_secret: '365aec3923fe452fbbeb31fe842c2a4c',
	redirect_uri: 'http://localhost:8888/spotify/callback/'
};

let accessToken = 'BQAnLXpx66YRPtPjKUKXsqZ8VaT6iBIAfD7CpxDVI7Z5dTrWwSEq2S-59HgTB7NGbm-N_w_-MkpJ-B04S0Msph2OpSYDmA_ZO-Izp5iGlj7QvskY9wBksnCzOKN1kuqYaLrwdKuWCKlba3m7hLRINhz1hRgTR3aPr6ZDXosJu1xostwbi3NtXRF_2zbhTzUX493r5ltcROhahqAXlpcGVZhl4rcD2RVLHqIgmxV2eJNyxbnCgrDvkRHQDNHzlegxX8yqU6w9tltSuW_GB6M';

let spotifyHeaders = {
	'Authorization': 'Bearer ' + accessToken,
	'Accept': 'application/json'
};

let spotifyApi = new SpotifyWebApi({
  clientId : spotifyCredentials.client_id,
  clientSecret : spotifyCredentials.client_secret,
  redirectUri : spotifyCredentials.redirect_uri
});

spotifyApi.setAccessToken(accessToken);

let state = 13131313131300;
let scopes = ['user-read-private', 'user-read-email'];

//start authentication flow
router.get('/login', (req, res) => {
	console.log('login: ', req.body);
	state++;
	let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
	res.header(spotifyHeaders).redirect(authorizeURL);
});

router.get('/callback', (req, res) => {
	console.log('callback yo: ', req);
})

//handle playlist search submission
router.post('/', bodyParser.json(), (req, res) => {
	let artist = req.body.artist;

	axios({
		url: `https://api.spotify.com/v1/search?q=${artist}&type=playlist&market=US&limit=10`,
		method: 'get',
		headers: spotifyHeaders
	})
	//maybe need to do a req, res, with chaining request? Look it up.
	.then((playlists) => {
		console.log('playlists: ', playlists.body);
		res.status(200).send('daaaata')
	})
	.catch((error) => {
		console.log('Error getting API data: ', error);
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

//these two steps may be unnecessary for time being
			// 4. request refresh and access tokens
			// 5. tokens returned to app
			// 6 and 7: do work
		
		// 1. get request for authorization
		// axios.get('https://accounts.spotify.com/authorize', {
		// 	params: {
		// 		// 2. do so with authorized scopes
		// 		client_id: spotifyCredentials.client_id,
		// 		response_type: 'code',
		// 		redirect_uri: spotifyCredentials.redirect_URIs[1],
		// 	}
		// })
		// // 3. user redirected back to redirect URI
		// 	//  how to deal with redirect? perhaps build route outside of component will mount. This should only be for 1st step
		// .then((response) => {
		// 	console.log('code for access token: ', response.code);
		// })
		// .catch((error) => {
		// 	console.log('authorization error: ', error);
		// });


		//// this promise chain will fetch the user id, create a playlist, then set the state for those two props
		// axios({
		// 	url: 'https://api.spotify.com/v1/me',
		// 	method: 'get',
		// 	headers: spotifyHeaders
		// })
		// //create playlist
		// .then((userId) => {
		// 	console.log('got userId: ', userId);
		// 	this.setState({
		// 		userId: userId
		// 	});

		// 	return axios({
		// 		url: `https://api.spotify.com/v1/users/${userId}/playlists`,
		// 		method: 'post',
		// 		headers: spotifyHeaders,
		// 		data: {
		// 			name: 'ConcertMate'
		// 		}
		// 	})
		// .then((playlist) => {
		// 	//setstate
		// 	this.setState({
		// 		playlistId: playlist.id
		// 	})

		// 	console.log('Playlist created', playlist);
		// })
		// });


module.exports = router;