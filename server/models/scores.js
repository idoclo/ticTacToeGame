'use strict'
const { db } = require('../../db');

const getScores = () => {
  return db.many(
    'SELECT player_id FROM scores'
  );
}

module.exports = {
  getScores
};