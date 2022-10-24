const express = require('express');

const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(user);
});

module.exports = router;
