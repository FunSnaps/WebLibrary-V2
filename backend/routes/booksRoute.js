const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const express = require("express");

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
    })
);

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
    })
);

module.exports = bookRouter;