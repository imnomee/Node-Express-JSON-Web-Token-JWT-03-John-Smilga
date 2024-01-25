const CustomError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomError('No token found', 401);
    }
    //token verification
    const token = authHeader.split(' ')[1];
    next();
};

module.exports = authenticationMiddleware;
