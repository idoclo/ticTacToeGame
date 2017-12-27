'use strict'
const PlayersModel = require('../models/players.js');
const CronJob = require('cron').CronJob;


const calculateScores = new CronJob('* * * * * *', () => {
  PlayersModel.getWinningPlayers()
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
      PlayersModel.calculatePlayerScore(key, value);
    })
  })
  .then(() => {
    console.log('Scores updated by CronJob');
  })
  .catch('Cron job failed to update scores');
}, null, true, 'America/Los_Angeles');


module.exports = calculateScores;