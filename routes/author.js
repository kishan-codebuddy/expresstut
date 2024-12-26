const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Author
router.post('/', async (req, res) => {
    try {
        const { name, bio, birthDate } = req.body;
        
        // Create author using Prisma
        const author = await prisma.author.create({
            data: {
                name,
                bio,
                birthDate
            }
        });
        
        res.status(201).json(author);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read All Authors
router.get('/', async (req, res) => {
    try {
        const authors = await prisma.author.findMany();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Single Author
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Use 'id' as defined in the route parameter
        const author = await prisma.author.findUnique({
            where: { id: id }, // Use the 'id' parameter to search for the author
            select: {
                books: true, // Fetch books related to the author
            },
        });
        
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        
        res.json(author.books); // Return only the books array
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Author
router.put('/:id', async (req, res) => {
    try {
        const { name, bio, birthDate } = req.body;
        
        // Update author using Prisma
        const author = await prisma.author.update({
            where: {
                id: req.params.id
            },
            data: {
                name,
                bio,
                birthDate
            }
        });
        
        if (!author) return res.status(404).send('Author not found');
        
        res.json(author);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Author
router.delete('/:id', async (req, res) => {
    try {
        const author = await prisma.author.delete({
            where: {
                id: req.params.id
            }
        });
        
        if (!author) return res.status(404).send('Author not found');
        
        res.send('Author deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
