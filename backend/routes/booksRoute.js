const expressAsyncHandler = require('express-async-handler');
const authMiddleware = require("../middlewares/authMiddleware");
const Book = require('../models/Book');
const express = require("express");

const bookRouter = express.Router();

//Create book
bookRouter.route('/').post(authMiddleware, expressAsyncHandler(async (req, res) => {
        const userId = req.user._id;
        const book = await Book.create({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            addedBy: userId,
        });

        if (book) {
            res.status(200);
            res.json(book)
        } else {
            res.status(500);
            throw new Error('Book creation failed!');
        }
    }));

//Fetch book
bookRouter.route('/').get(expressAsyncHandler(async (req, res) => {
        const book = await Book.find({});
        if (book) {
            res.status(200);
            res.json(book)
        } else {
            res.status(500);
            throw new Error('There are no books added yet!');
        }
    }));

//Update book
bookRouter.route('/:id').put(authMiddleware, expressAsyncHandler(async (req, res) => {
        const book = await Book.findById(req.params.id);

        if (book) {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.status(200);
            res.json(updatedBook);
        } else {
            res.status(500);
            throw new Error('Update failed');
        }
    }));

//Delete book
bookRouter.route('/:id').delete(expressAsyncHandler(async (req, res) => {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            res.status(200);
            res.send(book);
        } catch (error) {
            res.json(error);
        }
    }));

module.exports = bookRouter;