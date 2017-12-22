const express = require('express');
const router = express.Router();
const Game = require('../models/games.js');
const utils = require('./utils.js');


router.post('/reset', (req, res) => {
  const { value, playerX, playerO } = req.body;
  // console.log('req.body from client:', req.body, value, playerX, playerO);
  Game.deactivateGames()

  .then(() => 
    Game.start(playerX, playerO)
  )
  .then(response => {
    const { game_id, board } = response;
    // console.log('game started', response);
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
  const { squares, gameId, activePlayer } = req.body;
  // console.log('move POST obj', req.body);
  // Save move to the db
  Game.move(squares, gameId)
  .then(response => {
    // console.log(response);
    // Check if there is a winner
    return utils.isWinner(squares);
  })
  .then(isWinnerRes => {
    console.log('isWinnerRes:', isWinnerRes, 'activePlayer', activePlayer, 'gameId', gameId);
    if (isWinnerRes) {
      // Get activePlayerId and enter that as the winner in the db for the active game.
      if (activePlayer === 'playerX') {
        return Game.declarePlayerXWinner(gameId)
        .then(() => {
          res.status(200).send(isWinnerRes);
        });
      } else {
        return Game.declarePlayerOWinner(gameId)
        .then(() => {
          res.status(200).send(isWinnerRes);
        });
      }
    // Check if there is a draw
    } else {
      if (utils.drawGame(squares)) {
        Game.declareDraw(gameId)
        .then(() => {
          res.status(200).send('draw');
        });
      }
    }
  })
  .then(drawGameRes => {
    if (drawGameRes) {
      res.status(200).send('draw');
    } else {
      res.status(200).send('continue');
    }
  })
  .catch(err => {
    res.status(500).send();
  })
});

module.exports = router;