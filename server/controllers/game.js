const express = require('express');
const router = express.Router();

router.post('/reset', (req, res) => {
  const emptyBoard = Array(9).fill(null);
  res.status(200).send(emptyBoard);
});

module.exports = router;