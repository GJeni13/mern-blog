import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import porstRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});

const __dirname=path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(2015, () => {
    console.log("Server is running on port 2015");
});



app.use('/Backend/api/user',userRoutes);
app.use('/Backend/api/auth', authRoutes);
app.use('/Backend/api/post',porstRoutes);
app.use('/Backend/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname,'/frontend/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
