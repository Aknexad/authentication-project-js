const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  req.logOut(err => {
    if (err) {
      return next(err);
    }
    res.status(200).send('logout');
  });
});

module.exports = router;
