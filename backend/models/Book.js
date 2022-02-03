const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: [true, 'Book category is required']
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