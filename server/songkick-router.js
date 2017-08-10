let express = require('express');
let router = express.Router();
let axios = require('axios');
let url  = 'http://api.songkick.com/api/3.0/events.json?apikey=qRDqWCS0qJpDH4Qp&location=geo:37.783607,-122.408967'


console.log('FUCK');
axios.get(url)
  .then((res) => {
    console.log('RESPONSE ', res.data.resultsPage.results.event[0].venue.displayName); 
  })
  .catch((err) => {
    console.log('ERROR ', err);
  })

module.exports = router;