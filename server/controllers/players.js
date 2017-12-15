const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { playerName } = req.body;
  console.log('playerName sent down:', playerName);
  res.status(200).send();
});


module.exports = router;