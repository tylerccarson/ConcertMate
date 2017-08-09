const Sequelize = require('sequelize');
const seq = new Sequelize('GreenfieldDB', 'root', 'peligro', {
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