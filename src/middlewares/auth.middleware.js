import jwt from 'jsonwebtoken';

// Middleware para verificar si existe el token en la cookie

export const isAuth = (req, res, next) => {

    const token = req.cookies.jwt_token;

    jwt.verify(token, 'xyz123', (err, decode) => {
        
        if (err) {
            res.status(401).json({
                message: 'you dont have access'
            });
            console.log('you dont have access')
        } else {
            console.log(decode);
            req.userId = decode.id;
            next();
        }

    });

};
