const credentials = require('./config.js');
let user = credentials.loginData.user;
let password = credentials.loginData.password

const Sequelize = require('sequelize');
const seq = new Sequelize('greenfielddb', user, password, {
  host: 'localhost',
  dialect: 'mysql'
});

seq
  .authenticate()
  .then(() => {
    console.log('connection granted');
  })
  .catch(err => {
    console.log('error connecting to DB ', err);
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

let createEvent = Events.create({
	//fill in attribues
});

let getEvents = function(date) {
	Events.findAll({
		date: date
	});
};