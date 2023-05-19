import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//ROUTES
import authsRoutes from './routes/auths.js';
import usersRoutes from './routes/users.js';
import videosRoutes from './routes/videos.js';
import commentsRoutes from './routes/comments.js';

//!EXPRESS SERVER
const app = express();

//!MONGODB CONNECT
const dbConnect = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log('MongoDB Connected!');
        })
        .catch((err) => {
            throw err;
        });
};

//! MIDDLEWARE
dotenv.config();
app.use(express.json());
app.use(cookieParser());

//! API PATHS
app.use('/api/auths', authsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/comments', commentsRoutes);

//! API ROUTE ERROR HANDLE
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
});

//! MONGODB + APP
app.listen(8800, () => {
    console.log('Server Connected!');
    dbConnect();
});
