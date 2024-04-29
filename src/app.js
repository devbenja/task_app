import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { taskRouter } from './routes/tasks.routes.js';
import { loginRouter } from './routes/auth.routes.js';

import { ORIGIN } from './config.js';

import { pool } from './database.js';

export const app = express();

// Middlewares
app.use(cors({
    origin: ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.get('/', async (req, res) => {
    const result = await pool.query("SELECT NOW()");

    return res.json({ 
        message: 'Welcome to my Auth and Tasks API',
        date: result.rows[0].now
    })
});

app.use(taskRouter);
app.use(loginRouter);

// Error Handler
app.use((err, req, res, next ) => {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});