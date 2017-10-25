let express = require('express');
let router = express.Router();
let axios = require('axios');
let bodyParser = require('body-parser');
let db = require('../database/index.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

let googleAPIkey;

if (process.env.NODE_ENV === 'production') {
  googleAPIkey = process.env.GOOGLE_API_KEY;
} else {
  let config = require('../database/config.js');
  googleAPIkey = config.google.key;
}

// very beginning of implementing google search to pull lat/lng to recenter the map/songkick search
router.post('/search', bodyParser.json(), (req, res) => {

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=944+Market+Street&key=${googleAPIkey}`;
  axios.get(url)
    .then((response) => {
      console.log('response from google api ', response.data.results);
    })
})


module.exports = router;