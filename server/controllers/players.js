'use strict'
const express = require('express');
const router = express.Router();
const Player = require('../models/players.js');


router.get('/', (req, res) => {
  Player.getAll()
  .then(scoresArray => {
    res.status(200).send(scoresArray);
  })
  .catch(err => {
    res.status(500).send('Bad get all');
  });
});


router.get('/:username', (req, res) => {
  const username = req.params.username;
  Player.getByUsername(username)
  .then(response => {
    const { player_id } = response;
    res.status(200).send({ player_id, username });
  })
  .catch(err => {
    console.error('Username does not exist', err);
    res.status(400).send(JSON.stringify('Username does not exist'));
  });
});


router.post('/new', (req, res) => {
  const { username } = req.body;
  // first check that the username does not already exist
  Player.getByUsername(username)
  .then(response => {
    const { player_id } = response;
    res.status(405).send({ player_id, username });
  })
  .catch(err => {
    Player.addPlayer(username)
    .then(response => {
      const { player_id, username } = response;
      res.status(200).send({ player_id, username });
    })
    .catch(err => {
      res.status(500).send();
    });
  });
});


router.post('/scores', (req, res) => {
  Player.getWinningPlayers()
  .then(winningPlayers => {
    const winnerFrequency = new Map();
    winningPlayers.forEach(winningPlayer => {
      if (winnerFrequency.has(winningPlayer)) {
        const frequency = winnerFrequency.get(winningPlayer);
        winnerFrequency.set(winningPlayer, frequency + 1);
      } else {
        winnerFrequency.set(winningPlayer, 1);
      }
    });
    return winnerFrequency;
  })
  .then(winnerFrequencyMap => {
    winnerFrequencyMap.forEach((value, key, map) => {
      Player.calculatePlayerScore(key, value);
    })
  })
  .then(() => {
    return Player.getAll();
  })
  .then(playersWithUpdatedScores => {
    res.status(201).send(playersWithUpdatedScores);
  })
  .catch(err => {
    res.status(400).send('Bad bad bad');
  });
});


module.exports = router;