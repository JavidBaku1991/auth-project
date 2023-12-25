import express from 'express';
import mongoose from 'mongoose'
import  dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();


mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MONGODB connected")).catch((err)=>console.log(err))
const app=express();
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})


app.use(express.json());
app.use('/backend/user', userRoutes);
app.use('/backend/auth', authRoutes);

app.use((err,req,res,next)=>{
    const  statusCode=err.statusCode||500;
    const message =err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})