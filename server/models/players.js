'use strict'
const { db } = require('../../db');

const getByUsername = username => {
  return db.one(
    'SELECT player_id, avatar FROM players\
    WHERE username=$1',
    [username]
  );
};


const addPlayer = (username, avatarIndex) => {
  return db.one(
    'INSERT INTO players\
    (username, score, avatar) VALUES ($1, $2, $3)\
    RETURNING *',
    [username, 0, avatarIndex]
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