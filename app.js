const express = require('express');
const session = require('express-session');
const passport = require('passport');

const indexRoute = require('./routers/index');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');
const allUserRouters = require('./routers/allUser');

const aouth = require('./middleware/auth');

const app = express();

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

// route
app.use('/', indexRoute);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/allUser', aouth, allUserRouters);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app run on port ${port}`));
