const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = {
    id: Date.now().toString(),
    username: username,
    password: password,
  };
  data.push(user);
  res.status(200).json(user);
});

module.exports = router;
