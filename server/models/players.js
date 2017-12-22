const { db } = require('../../db');

const getByUsername = username => {
  return db.one(
    'SELECT player_id FROM players\
    WHERE username=$1',
    [username]);
};


const addPlayer = username => {
  return db.one(
    'INSERT INTO players\
    (username, score) VALUES ($1, $2)\
    RETURNING *',
    [username, 0]
  );
};


module.exports = {
  getByUsername,
  addPlayer
}