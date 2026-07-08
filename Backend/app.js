import express,{urlencoded} from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import user from './Models/user.model.js';
import userroute from './Routes/user.route.js'

const app = express();

import connectDB from './Config/Mongoose_connection.js';
import wishlistroute from './Routes/wishlist.route.js';
import feedbackroute from './Routes/feedback.route.js';
import historyroute from './Routes/history.route.js';

dotenv.config({});
await connectDB()
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get('/',(req,res)=>{
    res.send("Backend is Running 👍");
});

const PORT = process.env.PORT || 8000;

app.use('/api/v2/user',userroute);
app.use('/api/v2/wishlist',wishlistroute);
app.use('/api/v2/feedback',feedbackroute);
app.use('/api/v2/history',historyroute);

app.listen(PORT,()=>{
    console.log(`Server is Running on Port Number ${PORT}`);
});
