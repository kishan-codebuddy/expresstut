const express = require('express')
const router = express.Router();
const Author = require("./../models/author");

// Create Author
router.post('/', async (req, res) => {
    try {
        const author = new Author(req.body);
        const result = await author.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read All Authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Single Author
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).send('Author not found');
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Author
router.put('/:id', async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!author) return res.status(404).send('Author not found');
        res.json(author);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Author
router.delete('/:id', async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).send('Author not found');
        res.send('Author deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;