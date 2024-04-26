import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { taskRouter } from './routes/tasks.routes.js';
import { loginRouter } from './routes/auth.routes.js';

export const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.json( { message: 'Hola' } ));
app.use(taskRouter);
app.use(loginRouter);

// Error Handler
app.use((err, req, res, next ) => {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});