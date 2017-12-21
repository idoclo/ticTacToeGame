const express = require('express');
const router = express.Router();
// const Player = require('../models/players.js');

router.get('/:username', (req, res) => {
  const username = req.params.username;
  console.log('Existing playerName sent down:', username);
  res.status(200).send(req.params.id);
});

router.post('/new', (req, res) => {
  const { username } = req.body;
  console.log('New playerName sent down:', req.body);
  res.status(200).send(username);
});


module.exports = router;