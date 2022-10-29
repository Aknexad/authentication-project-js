const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// local strategy
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

// JWT strategy
const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

async function jwtValadation(jwt_payload, done) {
  const user = await prisma.user.findUnique({ where: { id: jwt_payload.sub } });
  try {
    if (user == null) {
      return done(null, false);
    }
    if (user) {
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
passport.use(new JwtStrategy(option, jwtValadation));
