import express from 'express';
import cors  from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';


import db from './config/mongo';
import indexRouter from './routes/index';
import User from './models/userModel';

const port = process.env.PORT;

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(passport.initialize());
db.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
declare module "express" {
    interface Request {
      user?: User;
    }
}
app.use('/',indexRouter); 
const passportJwt = require('./config/mongo.ts');

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);