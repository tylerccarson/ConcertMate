const Sequelize = require('sequelize');
const seq = new Sequelize('GreenfieldDB', 'student', 'student', {
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