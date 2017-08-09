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