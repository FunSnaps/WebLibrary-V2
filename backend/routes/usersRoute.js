const express = require("express");
const User = require("../models/User");
const tokenGenerator = require("../utils/tokenGenerator");
const expressAsyncHandler = require("express-async-handler");
const usersRoute = express.Router();

//Create user
usersRoute.route('/register').post(expressAsyncHandler(async (req, res) => {
    const {name, email, password, role} = req?.body;

    const existingUser = await User.findOne({email: email});
    if (existingUser) {
        throw new Error('The email provided is already tied to an account!');
    }
    const userCreated = await User.create({name, email, password, role});
    if (userCreated) {
        res?.json({
            _id: userCreated._id,
            name: userCreated.name,
            password: userCreated.password,
            email: userCreated.email,
            role:  userCreated.role,
            token: tokenGenerator(userCreated._id),
        });
    }
}));

//Login user
usersRoute.route('/login').post(expressAsyncHandler(async (req, res) => {
    const {email, password} = req?.body;

    const user = await User.findOne({email});
    console.log(user);

    if (user && (await user.doesPasswordMatch(password))) {
        res?.status(200);
        res?.status(201);
        res?.json({
            _id: user._id,
            name: user.name,
            password: user.password,
            email: user.email,
            token: tokenGenerator(user._id),
        });
    } else {
        res?.status(401);
        throw new Error('Invalid login credentials!');
    }
}));

//Delete user
usersRoute.route('/:id').delete(expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req?.params.id);
        res?.status(200);
        res?.send(user);
    } catch (error) {
        res?.json(error);
    }
}));

//Fetch users
usersRoute.route('/').get(expressAsyncHandler(async (req, res) => {
    const users = await User.find().populate('books');
    try  {
        res?.status(200);
        res?.json(users);
    } catch (error) {
        res?.status(500);
        throw new Error('No users found!');
    }
}));

//Update a user
usersRoute.route('/:id').put(expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req?.params.id);

        if (user) {
            user.name = req?.body.name || user.name;
            user.email = req?.body.email || user.email;

            if (req?.body.password) {
                user.password = req.body.password || user.password;
            }

            const updatedUser = await user.save();

            res?.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                password: updatedUser.password,
                email: updatedUser.email,
                token: tokenGenerator(updatedUser._id),
            });
        }

        res?.status(200);
        res?.json(updatedUser);
    } catch (error){
        res?.status(500);
        throw new Error('Update failed');
    }
}));

//ProfileRoute
usersRoute.route('/profile').get(expressAsyncHandler(async (req, res) => {
    try {
        console.log(req?.user);
        const user = await User.findById(req?.user.id).populate('books');
        res?.status(404);
        if (!user) throw new Error("You dont have an existing profile!")

        res?.status(200)
        res?.send(user);
    } catch (error) {
        res?.status(500)
        console.log(error);
        throw new Error('Server Error!');
    }
}));

//Update own profile
usersRoute.route('/profile/update').put(expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req?.user.id);
        if (user) {
            user.name = req?.body.name || user.name;
            user.email = req?.body.email || user.email;

            if (req?.body.password) {
                user.password = req.body.password || user.password;
            }

            const updatedUser = await user.save();

            res?.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                password: updatedUser.password,
                email: updatedUser.email,
                token: tokenGenerator(updatedUser._id),
            });
        }
    }));

module.exports = usersRoute;