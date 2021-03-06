const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'Book title is required!'],
        },
        author: {
            type: String,
            required: [true, 'Author name is required!']
        },
        category: {
            type: String,
            required: [true, 'Book category is required!']
        },
        price: {
            type: Number,
            required: [true, 'Book price is required!']
        },
        status: {
            type: String,
            default: 'Pending'
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    }, {
        timestamps: true,
    }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;