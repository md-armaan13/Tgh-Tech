import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const expiration = process.env.ExpieresIn || '1h';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export const login = async (req: express.Request, res: express.Response) => {
    const { email,  password } = req.body;
    if(!email || !password){
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
            
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const payload = { id: user.id, email: user.email , IsAdmin : user.IsAdmin};

        if (!JWT_SECRET_KEY) {
           return  res.status(500).json({ message: 'JWT secret key is not defined' });
            
        }

        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: expiration });

        return res.status(200).json({ access_token :token , message : 'Login successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
  }