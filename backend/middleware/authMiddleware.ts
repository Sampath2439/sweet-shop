import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel.ts';
import { Role } from '../../types.ts';

interface JwtPayload {
  id: string;
  role: string;
}

type AuthRequest = Request & {
  user?: { id: string; role: string };
};

// FIX: Explicitly use express types to avoid conflicts with global types.
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      
      // Attach user to the request but without the password
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = { id: user._id.toString(), role: user.role };
        next();
      } else {
         res.status(401).json({ message: 'Not authorized, user not found' });
      }

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


// FIX: Explicitly use express types to avoid conflicts with global types.
export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
      if (req.user && req.user.role === Role.ADMIN) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
