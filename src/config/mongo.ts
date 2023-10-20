import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const db= mongoose.connect(MONGO_URL);



export default db;
