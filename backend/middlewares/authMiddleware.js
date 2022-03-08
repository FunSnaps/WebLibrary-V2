const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = asyncHandler(async (req, res, next) => {

    if ((req?.path.includes('login') || req?.path.includes('register'))) {
        return next();
    };

    try {
        const decoded = jwt.verify(req?.headers.authorization, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        req.user = user;

        if (!decoded) {
            res?.status(401);
            throw new Error('Not authorised, no token found!');
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = {authMiddleware};
