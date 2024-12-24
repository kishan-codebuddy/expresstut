const express = require('express')
const router = express.Router();
const Book = require("./../models/book");
// Create Book
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        const result = await book.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read All Books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('author genres');
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Single Book
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author genres');
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Book
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Book
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.send('Book deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;