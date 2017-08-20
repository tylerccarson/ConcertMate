let express = require('express');
let router = express.Router();
let axios = require('axios');
let apiKey = 'qRDqWCS0qJpDH4Qp';
let bodyParser = require('body-parser');
//let db = require('../database/index.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', (req, res) => {
	let date = req.body.date;
  console.log(date);
  // check db for concert data for data
    //if there is data, then send that data back to the client
    //else, do the api call
      //put results into the db




	let url  = `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=geo:37.783607,-122.408967&min_date=${date}&max_date=${date}`;
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