const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Genre
router.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // Create genre using Prisma
        const genre = await prisma.genre.create({
            data: {
                name,
                description
            }
        });
        
        res.status(201).json(genre);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read All Genres
router.get('/', async (req, res) => {
    try {
        const genres = await prisma.genre.findMany();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Single Genre
router.get('/:id', async (req, res) => {
    try {
        const genre = await prisma.genre.findUnique({
            where: {
                id: req.params.id
            }
        });
        
        if (!genre) return res.status(404).send('Genre not found');
        
        res.json(genre);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Genre
router.put('/:id', async (req, res) => {
    try {
        const { name, description } = req.body;
        
        // Update genre using Prisma
        const genre = await prisma.genre.update({
            where: {
                id: req.params.id
            },
            data: {
                name,
                description
            }
        });
        
        if (!genre) return res.status(404).send('Genre not found');
        
        res.json(genre);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Genre
router.delete('/:id', async (req, res) => {
    try {
        const genre = await prisma.genre.delete({
            where: {
                id: req.params.id
            }
        });
        
        if (!genre) return res.status(404).send('Genre not found');
        
        res.send('Genre deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
