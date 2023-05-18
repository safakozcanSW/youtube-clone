import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authsRoutes from './routes/auths.js';
import usersRoutes from './routes/users.js';
import videosRoutes from './routes/videos.js';
import commentsRoutes from './routes/comments.js';

const app = express();
dotenv.config();

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

app.use('/api/auths', authsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/comments', commentsRoutes);

//! MONGODB + APP
app.listen(8800, () => {
    console.log('Server Connected!');
    dbConnect();
});
