import { Router } from "express";

// Router de express para las tareas

export const taskRouter = Router();

// Rutas de las tasks

taskRouter.get('/api/v1/tasks', (req, res) => res.send('all tasks'));

taskRouter.get('/api/v1/task/:id', (req, res) => res.send('task'));

taskRouter.post('/api/v1/create_task', (req, res) => res.send('create task'));

taskRouter.delete('/api/v1/task/:id', (req, res) => res.send('delete task'));

taskRouter.put('/api/v1/task/:id', (req, res) => res.send('update task'));
