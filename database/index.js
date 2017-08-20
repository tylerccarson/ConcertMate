const credentials = require('./config.js');
let user = credentials.loginData.user;
let password = credentials.loginData.password

const Sequelize = require('sequelize');
const seq = new Sequelize('greenfielddb', user, password, {
  host: 'localhost',
  dialect: 'mysql'
});

const Events = seq.define('events', {
  displayName: Sequelize.STRING,
  headline: Sequelize.STRING,
  uri: Sequelize.STRING,
  time: Sequelize.TIME,
  date: Sequelize.DATEONLY,
  venue: Sequelize.STRING,
  latitude: Sequelize.INTEGER,
  longitude: Sequelize.INTEGER
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
	Events.create({
		//fill in attribues
		displayName: Sequelize.STRING,
	  headline: Sequelize.STRING,
	  uri: Sequelize.STRING,
	  time: Sequelize.TIME,
	  date: Sequelize.DATEONLY,
	  venue: Sequelize.STRING,
	  latitude: Sequelize.INTEGER,
	  longitude: Sequelize.INTEGER
	});
} 

let getEvents = (date) => {
	Events.findAll({
		where: {
			date: date
		}
	})
};

module.exports.createEvent = createEvent;
module.exports.getEvents = getEvents;