const express = require('express');
const router = express.Router();
const Game = require('../models/games.js');
const Player = require('../models/players.js');
const utils = require('./utils.js');


router.post('/reset', (req, res) => {
  const { value, playerX, playerO } = req.body;
  // console.log('req.body from client:', req.body, value, playerX, playerO);
  Game.deactivateGames()
  .then(() => (
    Player.getByUsernames(playerX, playerO)
  ))
  .then(response => {
    const playerXId = response[0].player_id;
    const playerOId = response[1].player_id;
    console.log('returned two player ids:', response, playerXId, playerOId);
    return Game.start(playerXId, playerOId);
  })
  .then(response => {
    const { game_id, board } = response;
    console.log('game started', response);
    res.status(201).send({
      game_id,
      board
    });
  })
  .catch(error => {
    res.status(500).send(error.message);
  })
});


router.post('/move', (req, res) => {
  const { squares, gameId } = req.body;
  console.log('move POST obj', squares, gameId, req.body);
  // Save move to the db

  res.status(200).send('Hahah');
});

module.exports = router;