import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const expiration = process.env.ExpieresIn || '1h';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const salt = process.env.salt || 10;
async function hashPassword(password: string): Promise<string> {
    const saltRounds = salt;
    return bcrypt.hash(password, saltRounds);
}

export const login = async (req: express.Request, res: express.Response) => {
    const { email,  password } = req.body;
    if(!email || !password){
        return res.status(400).json({ status : 400,
            message: 'Please fill all the fields',
            "hasError" : true,
            data : null,
         });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status : 400,
                message: 'User does not exist',
                "hasError" : true,
                data : null,
             });
            
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ status : 400,
                message: 'Invalid Email or Password',
                "hasError" : true,
                data : null,
             });
        }

        const payload = { id: user.id, email: user.email , IsAdmin : user.IsAdmin};

        if (!JWT_SECRET_KEY) {
           return  res.status(500).json({ status : 500,
            message: 'Error Occured',
            "hasError" : true,
            data : null,
         });
            
        }

        const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: expiration });

        return res.status(200).json({ status : 200,
            message: 'Login Successful',
            "hasError" : false,
            data : {
                access_token : token
            },
         });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status : 500,
            message: 'An Error occured',
            "hasError" : true,
            data : null,
         });
    }
  }