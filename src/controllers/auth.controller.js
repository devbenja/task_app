import { pool } from '../database.js';
import bcrypt from 'bcrypt';

// Auth Controllers

export const login = (req, res) => res.send('Login');

export const register = async (req, res, next) => {

    const { user_name, user_password, user_email } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(user_password, 10);

        console.log(hashedPassword);

        const result = await pool.query(
            'INSERT INTO users (user_name, user_password, user_email) VALUES ($1, $2, $3) RETURNING *',
            [user_name, hashedPassword, user_email]
        );
    
        console.log('User Registered: ', result.rows[0]);
        return res.json(result.rows[0]);
    
    } catch (error) {

        if ( error.code === '23505' ) {
            res.status(400).json({
                message: 'Email Already Registered'
            });
            console.log(error);
        } else {
            console.log(error);
            next(error);
        }

    }

}

export const logout = (req, res) => res.send('Logout');

export const profile = (req, res) => res.send('User Profile');