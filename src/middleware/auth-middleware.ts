
import passport from '../auth/passport';
import { Request, Response, NextFunction } from 'express';
import  User  from '../models/userModel';

// This middleware will handle both JWT authentication and user assignment
export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: User | undefined) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Assign the user to req.user
    req.user = user;
    // Continue to the next middleware or route handler
    next();
  })(req, res, next);
};