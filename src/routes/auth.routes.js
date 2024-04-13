import { Router } from "express";
import * as Auth from '../controllers/auth.controller.js';

// Router de express para el auth

export const loginRouter = Router();

// Rutas del auth  

loginRouter.post('/api/v1/login', Auth.login );

loginRouter.post('/api/v1/register', Auth.register );

loginRouter.post('/api/v1/logout', Auth.logout );

loginRouter.get('/api/v1/profile', Auth.profile );