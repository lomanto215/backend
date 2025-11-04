import jwt from 'jsonwebtoken'
import createEror from 'http-errors'

const protect = (req, res, next) => {
    try {
        let token
        if (req.headers,authorization) {
            token = req.headers.authorization.split(' ')[1];
            let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } else {
            res.json({ 
                message: 'server need token' 
            });
        }
    } catch (error) {
        console.log(error);

        if (error && error.name === 'JsonWebTokenError') {
            next(new createError(400, 'invalid token'));
        } else if (error && error.name === 'TokenExpiredError') {
            next(new createError(400, 'token expired'));
        } else {
            next(new createError(400, 'token not active'));
        } 
    }
}

export default { protect }