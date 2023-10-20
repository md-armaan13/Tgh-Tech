// src/auth/passport.ts
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/userModel';


const secret_key = process.env.JWT_SECRET_KEY;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret_key,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user: User | null = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;