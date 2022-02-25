const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers.authorization && req?.headers.authorization.startsWith('Bearer')) {
        try {
            token = req?.headers.authorization.split(' ')[1];
            console.log('Token: ', token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log('Decoded: ', decoded);

            const user = await User.findById(decoded.id);
            req.user = user;
            console.log('User: ', user);
            next();

        } catch (error) {
            console.log(error);
            res?.status(401);
            throw new Error('This user is not authorised, invalid token!');
        }
    }
    if (!token) {
        res?.status(401);
        console.log(token);
        throw new Error('Not authorised, no token found!');

    }

});

module.exports = {authMiddleware};
