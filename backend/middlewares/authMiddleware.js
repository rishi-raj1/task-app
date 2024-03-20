import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = data;

        next();
    })
}