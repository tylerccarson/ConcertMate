let router = require('express').Router();
let axios = require('axios');

//spotify get
router.get(path, (req, res) => {
	//get list of artists from the request
	let artists;
	//execute axios request to spotify api
	axios({
		method: 'get',
		url: artists, //need to encodeURI for tracks, artists, whatever. Use the Spotify example
		baseURL: 'https://api.spotify.com',
	})
		.then((response) => {
			//send response back to playlist component to render data
			console.log(response.data);
			res.send(response.data);
		});
});

module.exports = router;