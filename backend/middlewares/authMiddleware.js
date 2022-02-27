const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = asyncHandler(async (req, res, next) => {

    if ((req?.path.includes('login') || req?.path.includes('register'))) {
        return next();
    };

    try {
        console.log('REQ: ', req?.headers.authorization);

        const decoded = jwt.verify(req?.headers.authorization, process.env.JWT_SECRET_KEY);
        console.log('Decoded: ', decoded);

        const user = await User.findById(decoded.id);
        req.user = user;
        console.log('User: ', user);

        if (!decoded) {
            res?.status(401);
            console.log('Token', decoded);
            throw new Error('Not authorised, no token found!');
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = {authMiddleware};
