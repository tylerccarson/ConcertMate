const Sequelize = require('sequelize');
let seq;

if (process.env.NODE_ENV === 'production') {
	let user = 'lvvcibvedjuksl';
	let password = 'c483158557256880ec572522f4dd15ff618909912c2c87aa1c832414a9f75a55';
  let port = 5432;
  let host = 'ec2-174-129-239-0.compute-1.amazonaws.com';
  let db = 'd87km75hurson7';
  let dialect = 'postgres';

  seq = new Sequelize(process.env.DATABASE_URL);

} else {
	let credentials = require('./config.js');
	let user = credentials.loginData.user;
	let password = credentials.loginData.password;

	seq = new Sequelize('greenfielddb', user, password, {
	  host: 'localhost',
	  dialect: 'mysql',
	  logging: false
	});
		
}

const Events = seq.define('events', {
  displayName: Sequelize.STRING,
  headline: Sequelize.STRING,
  uri: Sequelize.STRING,
  time: Sequelize.STRING,
  date: Sequelize.STRING,
  venue: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitude: Sequelize.STRING
});

Events.sync({force: false}).then(() => {
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

let getEvents = (date, callback) => {
	return Events.findAll({
		where: {
			date: date
		},
		raw: true
	})
	.then((data) => {
		callback(data);
	})
	.catch((error) => {
		console.log("Error getting events: ", error);
	})
};

module.exports.createEvent = createEvent;
module.exports.getEvents = getEvents;