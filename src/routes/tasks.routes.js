// import { Router } from "express";
import Router from "express-promise-router";
import * as Task from '../controllers/tasks.controller.js';
import { isAuth } from "../middlewares/auth.middleware.js";

// Router de express para las tareas

export const taskRouter = Router();

// Rutas de las tasks

taskRouter.get('/api/v1/list_tasks', isAuth , Task.getAllTasks );

taskRouter.get('/api/v1/task/:id', isAuth, Task.getTask );

taskRouter.post('/api/v1/create_task', isAuth, Task.createTask );

taskRouter.delete('/api/v1/delete_task/:id', isAuth, Task.deleteTask );

taskRouter.put('/api/v1/update_task/:id', isAuth, Task.updateTask );
