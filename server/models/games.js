'use strict'
const { db } = require('../../db');
const Player = require('./players.js');

const emptyBoard = Array(9).fill(null);


const start = (player_X, player_O) => {
  const playerXOIds = [];
  let playerXId = null;
  let playerOId = null;
  return db.one(
    'SELECT player_id from players WHERE username = $1', player_X
  )
  .then(playerXId => {
    playerXId = playerXId.player_id;
    return db.one(
      'SELECT player_id from players WHERE username = $1', player_O
    )
    .then(playerOId => {
      playerOId = playerOId.player_id;
      return db.one(
        'INSERT INTO games\
        (playerx, playero, board, game_status)\
        VALUES\
        ($1, $2, $3, $4)\
        RETURNING *',
        [playerXId, playerOId, emptyBoard, 'active']
      );
    });
  });
};


const deactivateGames = () => {
  return db.manyOrNone(
    'UPDATE games SET game_status = $1\
    WHERE game_status = $2\
    RETURNING *',
    ['inactive', 'active']
  );
}


const move = (board, gameId) => {
  return db.one(
    'UPDATE games SET board = $1\
    WHERE game_id = $2\
    RETURNING *',
    [board, gameId]
  );
};

module.exports = {
  start,
  deactivateGames,
  move
};