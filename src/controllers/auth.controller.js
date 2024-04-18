import { pool } from '../database.js';
import { createAccesToken } from '../libs/jwt.js';
import bcrypt from 'bcrypt';

// Auth Controllers

export const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }
        
        const result = await pool.query('SELECT * FROM users WHERE user_email = $1', [email] );

        if (result.rowCount === 0) {
            return res.status(400).json({
                message: 'Unregistered email'
            });
        } 

        const validPassword = await bcrypt.compare(password, result.rows[0].user_password);

        if (!validPassword) {
            return res.status(400).json({
                message: 'Incorrect Password'
            });
        }

        const token = await createAccesToken({ 
            id: result.rows[0].id_user,
            name: result.rows[0].user_name,
        });

        res.cookie('jwt_token', token, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 // 1 Dia
        }); 

        return res.json(result.rows[0]);

    } catch (error) {

        next(error);

    }
};

export const register = async (req, res, next) => {

    const { user_name, user_password, user_email } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(user_password, 10);

        const result = await pool.query(
            'INSERT INTO users (user_name, user_password, user_email) VALUES ($1, $2, $3) RETURNING *',
            [user_name, hashedPassword, user_email]
        );
    
        const token = await createAccesToken({ 
            id: result.rows[0].id_user,
            name: result.rows[0].user_name,
        });

        res.cookie('jwt_token', token, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 // 1 Dia
        }); 

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

export const logout = (req, res) => {
    res.clearCookie('jwt_token');
    res.sendStatus(200);
};

export const profile = (req, res) => res.send('User Profile');