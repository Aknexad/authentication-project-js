const express = require('express');
const passport = require('passport');

require('dotenv').config();

const indexRoute = require('./routers/index');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const allUserRouters = require('./routers/allUser');
const postRouters = require('./routers/post');

const app = express();

// passport //
require('./middleware/passport.strategy');
// middleware
app.use(express.json());
app.use(passport.initialize());

// route
app.use('/', indexRoute);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/post', passport.authenticate('jwt', { session: false }), postRouters);
app.use(
  '/allUser',
  passport.authenticate('jwt', { session: false }),
  allUserRouters
);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app run on port ${port}`));
