// 'use strict'
// const { db } = require('../../db');

// const getScores = async () =>
//   const scores = await db.many('SELECT * FROM scores');
//   const players = await db.many('SELECT * FROM players');
//   // db.many('SELECT * FROM scores')
//   // .then(scores => {
//   //   const playerWins = [];
//   //   return scores.forEach(scoreObj => {
//   //     return db.one('SELECT username FROM players where player_id = $1', scoreObj.player_id)
//   //     .then(usernameObj => {
//   //       console.log('username', usernameObj);
//   //       scoreObj.username = usernameObj.username;
//   //       playerWins.push(scoreObj);
//   //       return playerWins;
//   //     })
//   //     .then(array => {
//   //       console.log(array);
//   //       return array;
//   //     })
//   //   })
//   })
//   .catch(err => { console.log('Error in getScores', err) });



// module.exports = {
//   getScores
// };