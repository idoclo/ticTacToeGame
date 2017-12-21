const { db } = require('../../db');
const Player = require('./players.js');

const emptyBoard = Array(9).fill(null);


const start = (playerXId, playerOId) => {
  return db.one(
    'INSERT INTO games\
    (player_X, player_O, board, game_status)\
    VALUES\
    ($1, $2, $3, $4)\
    RETURNING *',
    [playerXId, playerOId, emptyBoard, 'active']
  );
};


const deactivateGames = () => {
  return db.manyOrNone(
    'UPDATE games SET game_status = $1\
    WHERE game_status = $2\
    RETURNING *',
    ['inactive', 'active']
  );
}


module.exports = {
  start,
  deactivateGames
};