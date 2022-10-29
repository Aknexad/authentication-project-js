const express = require('express');

const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get all post
router.get('/all', async (req, res) => {
  const userId = req.user.id;
  try {
    const allPost = await prisma.post.findMany({ where: { aothorId: userId } });
    if (allPost) {
      res.status(200).json({ posts: allPost });
    } else {
      res.send('no post');
    }
  } catch (error) {
    res.send(error);
  }
});

// crate post
router.post('/', async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        aothorId: req.user.id,
      },
    });
    if (post) {
      res.status(200).send('post added');
    } else {
      res.send('try agen');
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
