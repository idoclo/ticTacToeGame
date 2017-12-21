const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const path = require('path');
const GamesController = require('./controllers/games.js');
const PlayersController = require('./controllers/players.js');

const db = require('../db/index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.use('/games', GamesController);
app.use('/players', PlayersController);

app.use('*', (req, res) => {
  res.status(404).send();
});

app.listen(PORT, err => {
  err ? console.error('Problem with server') : console.log(`Listening on Port ${PORT}`);
});