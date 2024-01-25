const CustomError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomError('No token found', 401);
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        return next();
    } catch (err) {
        throw new CustomError('Not authorized to access this route', 401);
    }

    next();
};

module.exports = authenticationMiddleware;
