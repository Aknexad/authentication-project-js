const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//
const indexRoute = require('./routers/index');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');

const app = express();

const data = require('./data');

// passport //
async function authenticateUser(username, password, done) {
  const user = data.find(user => user.username === username);
  if (user == null) {
    return done(null, false, { message: 'user dont exist' });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      done(null, user);
    } else {
      done(null, false, { message: 'passwords dont mach' });
    }
  } catch (error) {
    done(error);
  }
}
// passport config
passport.use(new LocalStrategy(authenticateUser));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  done(
    null,
    users.find(user => user.id === id)
  );
});

// middleware
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
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

// set view engin
// app.set('view engine', 'pug');

// route
app.use('/', indexRoute);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app run on port ${port}`));
