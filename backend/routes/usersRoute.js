const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const usersRoute = express.Router();

//Register
usersRoute.route('/register').post(asyncHandler(async (req, res) => {
    const {name, email, password} = req?.body;

    const existingUser = await User.findOne({email: email});
    if (existingUser) {
        throw new Error('The email provided is already tied to an account!');
    }
    const userCreated = await User.create({name, email, password});
    res.send(userCreated);
    })
);

//Login
usersRoute.post('/login', (req, res) => {
    res.send('Login route');
});

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