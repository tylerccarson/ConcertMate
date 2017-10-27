const Sequelize = require('sequelize');
let seq;

if (process.env.NODE_ENV === 'production') {
  seq = new Sequelize(process.env.CLEARDB_DATABASE_URL);

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

const Op = Sequelize.Op

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
	console.log('Synced to events table');
});

seq
  .authenticate()
  .then(() => {
    console.log('Connection Granted');
  })
  .catch(err => {
    console.log('error connecting to DB ', err);
  });

let createEvents = (events) => {
  events = events.map((event) => {
  	return {
			displayName: event.displayName,
		  headline: event.headline,
		  uri: event.uri,
		  time: event.time,
		  date: event.date,
		  venue: event.venue,
		  latitude: event.latitude,
		  longitude: event.longitude
  	}
  })
	return Events.bulkCreate(events);
} 

let getEvents = (params, callback) => {
	//give range of 1 lng and lat in each direction (approximately 100 range total)
  let latMax = params.lat + 1;
  let latMin = params.lat - 1;
  let lngMax = params.lng + 1;
  let lngMin = params.lng - 1;

	return Events.findAll({
		where: {
			date: params.date,
			longitude: {
        [Op.between]: [lngMin, lngMax]
			},
			latitude: {
        [Op.between]: [latMin, latMax]
			}
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

module.exports.createEvents = createEvents;
module.exports.getEvents = getEvents;