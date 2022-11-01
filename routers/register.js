const express = require('express');
const bcrypt = require('bcrypt');

const valaditions = require('../middleware/valaditions');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.get('/', (req, res) => {});

router.post('/', valaditions, async (req, res) => {
  try {
    // chack username exist is DB
    const userChack = await prisma.user.findFirst({
      where: { username: req.body.username },
    });
    if (userChack)
      return res.json({
        status: 400,
        message: 'username exist try another username ',
      });
    //
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

module.exports = router;
