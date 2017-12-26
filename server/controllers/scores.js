'use strict'
const express = require('express');
const router = express.Router();
const Scores = require('../models/scores.js');

router.get('/', (req, res) => {
  Scores.getScores()
  .then(scores => {
    console.log('scores', scores);
    res.status(200).send(scores);
  })
  .catch(err => {
    console.error('Unable to GET scores from db');
    res.status(400).send('No good no good');
  })
});

router.post('/', (req, res) => {

});

module.exports = router;