const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
const tokenGenerator = require("../utils/tokenGenerator");
const expressAsyncHandler = require("express-async-handler");
const usersRoute = express.Router();

//Create user
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
    }));

//Update user
/*usersRoute.route('/:id').put(authMiddleware, expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password || user.password;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: generateToken(updatedUser._id),
            });
        }
    })
);

usersRoute.put(
    '/update', authMiddleware, expressAsyncHandler(async (req, res) => {

        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password || user.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: generateToken(updatedUser._id),
            });
        }
    })
);*/

//Delete user
usersRoute.route('/:id').delete(expressAsyncHandler(async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200);
            res.send(user);
        } catch (error) {
            res.json(error);
        }
    }));

//Fetch user
usersRoute.route('/').get(authMiddleware, expressAsyncHandler(async (req, res) => {
        const users = await User.find({});

        if (users) {
            res.status(200).json(users);
        } else {
            res.status(500);

            throw new Error('No users found!');
        }
    }));

//Login user
usersRoute.route('/login').post(asyncHandler(async (req, res) => {
    const {email, password} = req?.body;

    const user = await User.findOne({email});

    if (user && (await user.doesPasswordMatch(password))) {
        res.status(200);

        res.json({
            _id: user._id,
            name: user.name,
            password: user.password,
            email: user.password,
            token: tokenGenerator(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials!');
    }
}));

module.exports = usersRoute;