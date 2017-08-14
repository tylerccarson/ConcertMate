let express = require('express');
let router = express.Router();
let axios = require('axios');
//let apiKey = require()
let url  = `http://api.songkick.com/api/3.0/events.json?apikey=&location=geo:37.783607,-122.408967`
let bodyParser = require('body-parser');

// router.get('/', (req, res) => {
//   console.log('INSIDE ROUTER');
//   axios.get(url)
//     .then((res) => {
//       // console.log('RESPONSE ', res.data.resultsPage.results.event[0].performance[0].a);
//       let events = res.data.resultsPage.results;
//       console.log(events);
//       let releventInfo = {};
//       for (let i = 0; i < events.length; i++) {
        
//       }
//     })
//     .catch((err) => {
//       console.log('ERROR ', err);
//     })  
// });
// //let url  = 'http://api.songkick.com/api/3.0/events.json?apikey=qRDqWCS0qJpDH4Qp&location=geo:37.783607,-122.408967'


// console.log('FUCK');
// axios.get(url)
//   .then((res) => {
//     console.log('RESPONSE ', res.data.resultsPage.results.event[0].venue.displayName); 
//   })
//   .catch((err) => {
//     console.log('ERROR ', err);
//   })

module.exports = router;