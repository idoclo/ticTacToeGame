const express = require('express');
const router = express.Router();
const Player = require('../models/players.js');


router.get('/:username', (req, res) => {
  const username = req.params.username;
  console.log('Existing playerName sent down:', username);
  Player.getByUsername(username)
  .then(response => {
    const { player_id } = response;
    res.status(200).send({ player_id, username });
  })
  .catch(err => {
    console.error('Username does not exist', err);
    res.status(400).send('Username does not exist');
  });
});


router.post('/new', (req, res) => {
  const { username } = req.body;
  console.log('New playerName sent down:', req.body, 'username:', username);
  // first check that the username does not already exist
  Player.getByUsername(username)
  .then(response => {
    console.log(response)
    const { player_id } = response;
    res.status(405).send({ player_id, username });
  })
  .catch(err => {
    console.error('Silly billy');
    // player_id was not found so add it
    Player.addPlayer(username)
    .then(response => {
      console.log(response);
      const { player_id, username } = response;
      res.status(200).send({ player_id, username });
    })
    .catch(err => {
      console.error('Error adding new player to db.', err);
      res.status(500).send();
    });
  });

});


module.exports = router;