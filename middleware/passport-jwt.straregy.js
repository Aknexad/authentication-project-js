const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

passport.use(new JwtStrategy(option, jwtValadation));
