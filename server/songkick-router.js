let express = require('express');
let router = express.Router();
let axios = require('axios');
let apiKey = 'qRDqWCS0qJpDH4Qp';
let url  = `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=geo:37.783607,-122.408967`;
let bodyParser = require('body-parser');

router.get('/', (req, res) => {
  axios.get(url)
    .then((events) => {
      let data = events.data.resultsPage.results;
      res.send(data);
    })
    .catch((err) => {
      console.log('ERROR ', err);
      res.status(404).send();
    })
});

module.exports = router;