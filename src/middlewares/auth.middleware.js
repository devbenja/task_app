import jwt from 'jsonwebtoken';

// Middleware para verificar si existe el token en la cookie

export const isAuth = (req, res, next) => {

    const token = req.cookies.jwt_token;

    jwt.verify(token, 'xyz123', (err, decode) => {
        
        if (err) {

            return res.status(401).json({
                message: 'you dont have access'
            });

        } else {

            req.userId = decode.id;
            req.userName = decode.name;
            next();

        }

    });

};
