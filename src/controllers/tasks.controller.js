import { pool } from '../database.js';

// Task Controllers

export const getAllTasks = async (req, res, next) => {

    console.log(req.userId);

    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);

};

export const getTask = async (req, res, next) => {

    try {

        const result = await pool.query(
            'SELECT * FROM tasks WHERE id_task = $1', [req.params.id]
        );

        if ( result.rows.length > 0 ) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({
                message: 'Task No Exist'
            });
        }
        
    } catch (error) {
        next(error);
    }

};

export const createTask = async (req, res, next) => {

    console.log('Tarea Creada por Usuario con id: ', req.userId );

    const { title, description } = req.body;

    try {

        const result = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );

        res.json(result.rows[0]);
        //console.log('Insert: ', result.rows[0]);

    } catch (error) {

        if ( error.code === '23505' ) {
            return res.status(409).json({
                message: 'Task Already Exist'
            });
        }

        next(error);

    }

}; 

export const deleteTask = async (req, res, next) => {

    try {

        const result = await pool.query(
            'DELETE FROM tasks WHERE id_task = $1', [req.params.id]
        );

        if ( result.rowCount === 0 ) {
            res.status(404).json({
                message: 'Task No Exist'
            });
            //console.log(result);
        } else {
            res.json({ message: `Task with id: ${req.params.id} Deleted` });
            //console.log(result);
        }

    } catch (error) {
        next(error);
    }

};

export const updateTask = async (req, res, next) => {

    const id = req.params.id;
    const { title, description } = req.body;

    try {
        const result = await pool.query(
            'UPDATE tasks SET title = $1, description = $2 WHERE id_task = $3',
            [title, description, id]
        );
        
        if ( result.rowCount === 0 ) {
            res.status(404).json({
                message: 'Task No Exist'
            });
            //console.log(result);
        } else {
            res.json({ message: `Task with id: ${req.params.id} Updated` });
            //console.log(result);
        }
    } catch (error) {
        next(error);
    }

};

