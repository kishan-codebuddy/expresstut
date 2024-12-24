const mongoose = require('mongoose');
const Author = require("./author");
const Genre = require("./genre");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    publishedDate: Date,
    pages: Number
});

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;