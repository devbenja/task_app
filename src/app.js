import express from 'express';
import morgan from 'morgan';
import { connection } from './database.js';
import cors from 'cors';

connection();
export const app = express();

app.use(cors());
app.use(express.json());

app.get('/v1/get_usuarios', (req, res) => {
    connection.query('SELECT * FROM "users"', (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
        
        res.status(200).json({ users: results.rows });
        //console.log('Usuarios', results.rows );

    });
});

app.use(morgan('dev'));
