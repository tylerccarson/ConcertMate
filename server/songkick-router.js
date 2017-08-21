let express = require('express');
let router = express.Router();
let axios = require('axios');
let apiKey = 'qRDqWCS0qJpDH4Qp';
let bodyParser = require('body-parser');
let db = require('../database/index.js');
let async = require('async');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', (req, res) => {
	let date = req.body.date;
  let lat = req.body.lat;
  let lng = req.body.lng;
  db.getEvents(date, (dbEvents) => {
    if (dbEvents.length) {
        res.send(dbEvents);
    } else {
      // here you could add functionality to setting a min/max date to search between
    	let url = `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=geo:${lat},${lng}&min_date=${date}&max_date=${date}`;
      axios.get(url)
        .then((events) => {
          let data = events.data.resultsPage.results.event;
          async.each(data, (event) => {
            db.createEvent(event);
          })
        })
        // async bug
        .then(() => {
          db.getEvents(date, (newEvents) => {
            res.send(newEvents);
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