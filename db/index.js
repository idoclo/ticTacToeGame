const pgp = require('pg-promise')();
const schema = require('./schema.js');

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'tictactoe'
};

const db = pgp(connection);

const loadDb = db => (
  schema(db)
);

loadDb(db)
.then(() => {
  console.log('db loaded');
})
.catch(err => {
  console.error('Error loading db:', err);
});


module.exports = {
  db,
  loadDb
};