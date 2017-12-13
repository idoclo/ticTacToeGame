const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../client/dist`));

app.use('*', (req, res) => {
  res.status(404).send();
});

app.listen(PORT, err => {
  err ? console.error('Problem with server') : console.log(`Listening on Port ${PORT}`);
});