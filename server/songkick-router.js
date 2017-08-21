let express = require('express');
let router = express.Router();
let axios = require('axios');
let apiKey = 'qRDqWCS0qJpDH4Qp';
let bodyParser = require('body-parser');
let db = require('../database/index.js');
let Promise = require('bluebird');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', (req, res) => {
	let date = req.body.date;
  db.getEvents(date)
    .then((dbEvents) => {
      if (dbEvents.length) {
        console.log(dbEvents[0])
        res.send(dbEvents);
      } else {
      	let url = `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=geo:37.783607,-122.408967&min_date=${date}&max_date=${date}`;
        axios.get(url)
          .then((events) => {
            let data = events.data.resultsPage.results.event;
            data.forEach((event) => {
              db.createEvent(event);
            });
            db.getEvents(date)
          .then((dbEvents) => {
            res.send(dbEvents);
          });
        })
      }
    })
    .catch((err) => {
      console.log('ERROR ', err);
      res.status(404).send(); 
    });
});

module.exports = router;