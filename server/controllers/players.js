'use strict'
const express = require('express');
const router = express.Router();
const Player = require('../models/players.js');


router.get('/', (req, res) => {
  Player.getAll()
  .then(scoresArray => {
    res.status(200).send(JSON.stringify(scoresArray));
  })
  .catch(err => {
    res.status(500).send('Bad get all');
  });
});


router.get('/:username', (req, res) => {
  const username = req.params.username;
  Player.getByUsername(username)
  .then(response => {
    const { player_id, avatar } = response;
    res.status(200).send({ player_id, username, avatar });
  })
  .catch(err => {
    console.error('Username does not exist', err);
    res.status(400).send(JSON.stringify('Username does not exist'));
  });
});


router.post('/new', (req, res) => {
  const { username, avatarIndex } = req.body;
  // first check that the username does not already exist
  Player.getByUsername(username)
  .then(response => {
    const { player_id, avatar } = response;
    res.status(405).send({ player_id, username, avatar });
  })
  .catch(err => {
    Player.addPlayer(username, avatarIndex)
    .then(response => {
      const { player_id, username, avatar } = response;
      res.status(200).send({ player_id, username, avatar });
    })
    .catch(err => {
      res.status(500).send();
    });
  });
});


module.exports = router;