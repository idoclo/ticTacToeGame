const pgp = require('pg-promise')();
const schema = require('./schema.js');

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'tictactoe'
};

const url = process.env.DATABASE_URL || connection;

const db = pgp(url);

const loadDb = db => schema(db);

const resetDb = () => db.none('TRUNCATE games, players RESTART IDENTITY CASCADE');

loadDb(db)
.then(() => {
  console.log('db loaded');
})
.catch(err => {
  console.error('Error loading db:', err);
});


module.exports = {
  db,
  loadDb,
  resetDb
};