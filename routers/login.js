const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.get('/', (req, res) => {});

router.post(
  '/',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const payload = {
      sub: req.user.id,
      username: req.user.username,
      iat: Date.now(),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ user: payload, token: token });
  }
);

// router.post('/', (req, res) => {
//   const inpoutName = req.body.username;
//   const inpoutPass = req.body.password;
//   const user = data.find(user => user.username === inpoutName);
//   if (!user) {
//     return res.status(401).send('roungpassword or user name');
//   }
//   if (user.password === inpoutPass) {
//     return res.status(200).json(user);
//   } else {
//     return res.status(401).send('try agen roung password our username');
//   }
// });

module.exports = router;
