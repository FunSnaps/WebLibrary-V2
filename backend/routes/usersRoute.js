const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const tokenGenerator = require("../utils/tokenGenerator");
const usersRoute = express.Router();

//Register
usersRoute.route('/register').post(asyncHandler(async (req, res) => {
        const {name, email, password} = req?.body;

        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            throw new Error('The email provided is already tied to an account!');
        }
        const userCreated = await User.create({name, email, password});
        res.json({
            _id: userCreated._id,
            name: userCreated.name,
            password: userCreated.password,
            email: userCreated.email,
            token: tokenGenerator(userCreated._id),
        });
    })
);

//Login
usersRoute.route('/login').post(asyncHandler(async (req, res) => {
        const {email, password} = req?.body;

        const user = await User.findOne({email});

        if (user && (await user.doesPasswordMatch(password))) {
            res.status(200);

            res.json({
                _id: user._id,
                name: user.name,
                password: user.password,
                email: user.email,
                token: tokenGenerator(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid credentials!');
        }
    })
);

//Update
usersRoute.put('/update', (req, res) => {
    res.send('Update route');
});

//Delete
usersRoute.delete('/:id', (req, res) => {
    res.send('Delete route');
});

//Fetch
usersRoute.get('/', (req, res) => {
    res.send('Fetch route');
});


module.exports = usersRoute;