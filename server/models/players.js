'use strict'
const { db } = require('../../db');

const getByUsername = username => {
  return db.one(
    'SELECT player_id FROM players\
    WHERE username=$1',
    [username]
  );
};


const addPlayer = username => {
  return db.one(
    'INSERT INTO players\
    (username, score) VALUES ($1, $2)\
    RETURNING *',
    [username, 0]
  );
};


const getAll = () => {
  return db.many('SELECT * FROM players');
};


const getWinningPlayers = () => {
  return db.many('SELECT winner FROM games\
    JOIN players ON games.winner=players.player_id'
  )
  .then(winningPlayers => {
    return winningPlayers.map(winningPlayer => winningPlayer.winner);
  })
  .catch(err => {
    console.error('Unable to get winningPlayers from db', err);
  });
};


const calculatePlayerScore = (playerId, score) => {
  return db.one(
    'UPDATE players SET score=$1 WHERE player_id=$2\
    RETURNING *',
    [score, playerId]
  );
};


module.exports = {
  getByUsername,
  addPlayer,
  getAll,
  getWinningPlayers,
  calculatePlayerScore
};