import { Router } from "express";
import * as Auth from '../controllers/auth.controller.js';

import { isAuth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

// Router de express para el auth

export const loginRouter = Router();

// Rutas del auth  

loginRouter.post('/api/v1/login', validateSchema(loginSchema), Auth.login );

loginRouter.post('/api/v1/register', validateSchema(registerSchema), Auth.register );

loginRouter.post('/api/v1/logout', Auth.logout );

loginRouter.get('/api/v1/profile', isAuth, Auth.profile );