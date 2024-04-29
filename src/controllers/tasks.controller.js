import { pool } from '../database.js';

// Task Controllers

export const getAllTasks = async (req, res, next) => {

    const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1',
        [req.userId]
    );
    
    return res.json(result.rows);

};

export const getTask = async (req, res, next) => {

    try {

        const result = await pool.query(
            'SELECT * FROM tasks WHERE id_task = $1', [req.params.id]
        );

        if ( result.rows.length > 0 ) {
            return res.json(result.rows[0]);
        } else {
            return res.status(404).json({
                message: 'Task No Exist'
            });
        }
        
    } catch (error) {
        next(error);
    }

};

export const createTask = async (req, res, next) => {

    const { title, description } = req.body;

    try {

        const result = await pool.query(
            'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
            [title, description, req.userId]
        );

        res.json(result.rows[0]);

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
            return res.status(404).json({
                message: 'Task No Exist'
            });
            
        } else {

            return res.json({ 
                message: `Task with id: ${req.params.id} Deleted` 
            });

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
            return res.status(404).json({
                message: 'Task No Exist'
            });
            
        } else {

            return res.json({ message: `Task with id: ${req.params.id} Updated` });
            
        }
    } catch (error) {
        next(error);
    }

};

