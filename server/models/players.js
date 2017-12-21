const { db } = require('../../db');

const getByUsername = username => {
  return db.one(
    'SELECT player_id FROM players\
    WHERE username=$1',
    [username]);
};

const getByUsernames = (username1, username2) => {
  return db.many(
    'SELECT player_id FROM players\
    WHERE username in ($1, $2)',
    [username1, username2]);
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
  getByUsernames,
  addPlayer
}