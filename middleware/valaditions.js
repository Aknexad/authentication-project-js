function valaditions(req, res, next) {
  const password = req.body.password;
  const rePass = req.body.rePass;
  const name = req.body.username;

  if (name.length < 3)
    return res.json({
      status: 400,
      message: 'username must be more 3 Letters',
    });
  if (password.length < 4) {
    return res.json({
      status: 400,
      message: 'passowrd must be more 4 Letters',
    });
  }
  if (password !== rePass)
    return res.json({ status: 400, message: 'password dont match' });

  next();
}

module.exports = valaditions;
