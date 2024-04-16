import express from 'express';
import cors from 'cors';

import { taskRouter } from './routes/tasks.routes.js';
import { loginRouter } from './routes/auth.routes.js';

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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