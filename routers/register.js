const express = require('express');
const bcrypt = require('bcrypt');
const data = require('../data');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();

router.get('/', (req, res) => {});

router.post('/', async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 7);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPass,
      },
    });
    if (user) {
      return res.status(200).send('account cratted');
    } else {
      return res.status(400).send('try agen');
    }
  } catch {
    res.status(401).send('try agen');
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const hashedPass = await bcrypt.hash(req.body.password, 7);
//     const user = {
//       id: Date.now().toString(),
//       username: req.body.username,
//       password: hashedPass,
//     };
//     data.push(user);
//     res.status(200).send('account cratted');
//   } catch {
//     res.status(401).send('try agen');
//   }
// });

// router.post('/', (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = {
//     id: Date.now().toString(),
//     username: username,
//     password: password,
//   };
//   data.push(user);
//   res.status(200).json(user);
// });

module.exports = router;
