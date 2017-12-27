// 'use strict'
// const express = require('express');
// const router = express.Router();
// const Players = require('../models/players.js');

// router.get('/', (req, res) => {
//   // Get player_ids that are in the Score table
//   Players.getAllScores()
//   .then(scoresArray => {
//     console.log(scoresArray);
//     res.status(200).send(scoresArray);
//   })
//   .catch(err => {
//     console.error('Unable to GET scores from db');
//     res.status(400).send('No good no good');
//   })
// });

// router.get('/score', (req, res) => {
//   Player.getAllScores()
//   .then(allScores => {
//     res.status(200).send(allScores);
//   })
//   .catch(err => {
//     res.status(500).send();
//   })
// })

// module.exports = router;