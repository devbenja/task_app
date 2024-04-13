import { Router } from "express";

// Router de express para el auth

export const loginRouter = Router();

// Rutas del auth  

loginRouter.post('/api/v1/login', (req, res) => res.send('Login'));

loginRouter.post('/api/v1/register', (req, res) => res.send('Register'));

loginRouter.post('/api/v1/logout', (req, res) => res.send('Logout'));

loginRouter.get('/api/v1/profile', (req, res) => res.send('User Profile'));