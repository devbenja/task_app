import { pool } from '../database.js';

// Task Controllers

export const getAllTasks = async (req, res, next) => {

    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);

};

export const getTask = async (req, res) => {

    const id_task = req.params.id;

    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id_task = ($1)', [id_task]
        );

        if ( result.rows.length > 0 ) {
            res.json(result.rows);
        } else {
            res.json({
                message: 'Task No Exist'
            });
        }
        
    } catch (error) {
        console.log(error);
    }

};

export const createTask = async (req, res, next) => {

    const { title, description } = req.body;

    try {

        const result = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );

        res.json(result.rows[0]);
        console.log('Insert: ', result.rows[0]);

    } catch (error) {

        if ( error.code === '23505' ) {
            return res.status(409).json({
                message: 'Task Already Exist'
            });
        }

        next(error);

    }

}; 

export const deleteTask = (req, res) => res.send('delete task');

export const updateTask = (req, res) => res.send('update task');

