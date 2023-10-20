
import passport from '../auth/passport';
import { Request, Response, NextFunction } from 'express';
import  User  from '../models/userModel';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: User | undefined) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }


    req.user = user;
    
    next();
  })(req, res, next);
};