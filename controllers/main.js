const CustomError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new CustomError('Please provide email and password.', 400);
    }
    //just for demo, we get the id from database normally.
    const id = new Date().getDate();

    //try to keep the payload small, better experience for slow internet users
    //1. provide payload
    //2. jwt secret
    //3. options
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    console.log(username, password, token);

    res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        const myLuckyNumber = Math.floor(Math.random() * 100);
        res.status(200).json({
            msg: `Hello, ${decoded.username}`,
            secret: `Your lucky number is ${myLuckyNumber}`,
        });
    } catch (err) {
        throw new CustomError('Not authorized to access this route', 401);
    }
};

module.exports = {
    login,
    dashboard,
};
