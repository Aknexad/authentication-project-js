const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function authenticateUser(username, password, done) {
  const user = prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (user == null) {
    return done(null, false, { message: 'user dont exist' });
  }
  try {
    if (await bcrypt.compare(password, password)) {
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
    data.find(user => user.id === id)
  );
});
