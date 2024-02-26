import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import { decodeCustomToken } from './middleware/decodeToken';

const app = express();
dotenv.config();
app.use(cors({
    credentials:true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth',authRoutes);
app.use('/user',decodeCustomToken,userRoutes);

app.get('/',  (req:express.Request,res:express.Response)=>{
   res.status(200).send('Welcome to TodoList API')
})
const PORT = process.env.PORT||3008;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))