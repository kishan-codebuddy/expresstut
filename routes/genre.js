const express = require('express')
const router = express.Router();
const Genre = require("./../models/genre");

router.post('/', async (req, res) => {
    try {
        const genre = new Genre(req.body);
        const result = await genre.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read All Genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Single Genre
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('Genre not found');
        res.json(genre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Genre
router.put('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!genre) return res.status(404).send('Genre not found');
        res.json(genre);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Genre
router.delete('/genres/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if (!genre) return res.status(404).send('Genre not found');
        res.send('Genre deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;