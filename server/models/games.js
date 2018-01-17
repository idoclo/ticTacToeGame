'use strict'
const { db } = require('../../db');
const Player = require('./players.js');

const emptyBoard = Array(9).fill(null);


const start = (player_X, player_O) => {
  const playerXOIds = [];
  let playerXId = null;
  let playerOId = null;
  return db.one('SELECT player_id from players WHERE username = $1', player_X)
  .then(playerXId => {
    playerXId = playerXId.player_id;
    return db.one('SELECT player_id from players WHERE username = $1', player_O)
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

const declarePlayerXWinner = gameId => {
  // Get playerId of winning player first
  return db.one('SELECT playerx from games WHERE game_id = $1', gameId)
  .then(winningPlayerId => {
    const { playerx } = winningPlayerId;
    return db.one(
      'UPDATE games SET winner = $1 WHERE game_id = $2 RETURNING *',
      [playerx, gameId]
    );
  })
  .then(() => db.one('UPDATE games SET game_status = $1 WHERE game_id = $2 RETURNING *', ['inactive', gameId]));
};

const declarePlayerOWinner = gameId => {
  return db.one('SELECT playero from games WHERE game_id = $1', gameId)
  .then(winningPlayerId => {
    const { playero } = winningPlayerId;
    return db.one(
      'UPDATE games SET winner = $1 WHERE game_id = $2 RETURNING *',
      [playero, gameId]
    );
  })
  .then(() => db.one('UPDATE games SET game_status = $1 WHERE game_id = $2 RETURNING *', ['inactive', gameId]));
};

const declareDraw = gameId => {
  return db.one('UPDATE games SET game_status = $1 WHERE game_id = $2 RETURNING *', ['inactive', gameId]);
};

module.exports = {
  start,
  deactivateGames,
  move,
  declarePlayerXWinner,
  declarePlayerOWinner,
  declareDraw
};