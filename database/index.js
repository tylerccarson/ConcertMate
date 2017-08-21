const credentials = require('./config.js');
let user = credentials.loginData.user;
let password = credentials.loginData.password

const Sequelize = require('sequelize');
const seq = new Sequelize('greenfielddb', user, password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const Events = seq.define('events', {
  displayName: Sequelize.STRING,
  headline: Sequelize.STRING,
  uri: Sequelize.STRING,
  time: Sequelize.TIME,
  date: Sequelize.DATEONLY,
  venue: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitude: Sequelize.STRING
});

Events.sync({force: true}).then(() => {
	console.log('Created "events" table');
});

seq
  .authenticate()
  .then(() => {
    console.log('connection granted');
  })
  .catch(err => {
    console.log('error connecting to DB ', err);
  });

let createEvent = (event) => {
	return Events.create({
		displayName: event.displayName,
	  headline: event.performance[0].displayName,
	  uri: event.uri,
	  time: event.start.time,
	  date: event.start.date,
	  venue: event.venue.displayName,
	  latitude: event.location.lat,
	  longitude: event.location.lng
	});
} 

let getEvents = (date) => {
	return Events.findAll({
		where: {
			date: date
		},
		raw: true
	})
};

module.exports.createEvent = createEvent;
module.exports.getEvents = getEvents;