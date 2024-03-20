import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';

// dotenv.config();


import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

import { errorHandler, notFound } from './middlewares/errorMiddleware.js';



const app = express();

dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;


app.listen(PORT, async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`server is running at PORT: ${PORT} and database is connected successfully`);
    }
    catch (err) {
        console.log('database not connected');
    }
})