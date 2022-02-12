const express = require("express");
const expressAsyncHandler = require('express-async-handler');
const authMiddleware = require("../middlewares/authMiddleware");
const Book = require('../models/Book');
const bookRouter = express.Router();

//Create book
bookRouter.route('/').post(expressAsyncHandler(async (req, res) => {
    const book = await Book.create(req.body);
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
    const book = await Book.find().populate('addedBy').sort('createdAt');
    if (book) {
        res.status(201);
        res.json(book)
    } else {
        res.status(401);
        throw new Error('There are no books added yet!');
    }
}));

//Update book
bookRouter.route('/:id').put(expressAsyncHandler(async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
        res.status(200);
        res.json(updatedBook);
    } catch (error){
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
        res.status(500);
        throw new Error('Server Error!');
    }
}));

//Find a book
bookRouter.route('/:id').get(expressAsyncHandler(async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            res.status(200);
            res.send(book);
        } catch (error) {
            res.status(500);
            throw new Error('No book found');
        }
    })
);


module.exports = bookRouter;