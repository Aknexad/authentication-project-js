const express = require('express');
const session = require('express-session');
const passport = require('passport');
//
const indexRoute = require('./routers/index');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');

const app = express();

const data = require('./data');

// passport //
require('./middleware/passport.strategy');
// middleware
app.use(express.json());

app.use(
  session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set view engin
// app.set('view engine', 'pug');

// route
app.use('/', indexRoute);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app run on port ${port}`));
