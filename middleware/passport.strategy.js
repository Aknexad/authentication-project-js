const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function authenticateUser(username, password, done) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (user == null) {
    return done(null, false);
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
}
// passport config
passport.use(new LocalStrategy(authenticateUser));
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((userId, done) => {
//   done(null, prisma.user.findUnique({ where: { id: userId } }));
// });
