const express = require('express');
const router = express.Router();
const prisma = require('../prisma/index.js');

// Create Book
router.post('/', async (req, res) => {
    try {
        const { title, summary, publishedDate, pages, authorId, genres } = req.body;

        const book = await prisma.book.create({
            data: {
                title,
                summary,
                publishedDate,
                pages,
                authorId,
                genres, // Directly store genres as an array of IDs
            },
        });

        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



// Read All Books
router.get('/', async (req, res) => {
    try {
        // Fetch all books
        const books = await prisma.book.findMany({
            include: {
                author: true,  // Include the author information
            },
        });

        // For each book, resolve the genre IDs to the actual genre data
        const booksWithGenres = await Promise.all(
            books.map(async (book) => {
                const genres = await prisma.genre.findMany({
                    where: {
                        id: {
                            in: book.genres,  // Find genres with the IDs in the book's genres array
                        },
                    },
                });

                return {
                    ...book,
                    genres,  // Add the resolved genres to the book object
                };
            })
        );

        res.json(booksWithGenres);  // Send the books with genres as a response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Read Single Book
router.get('/:id', async (req, res) => {
    try {
        const book = await prisma.book.findUnique({
            where: { id: req.params.id },
            include: {
                author: true,
                bookGenres: { include: { genre: true } },
            },
        });
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Book
router.put('/:id', async (req, res) => {
    try {
        const { title, summary, publishedDate, pages, authorId, genres } = req.body;
        // Update the book and its relations
        const book = await prisma.book.update({
            where: { id: req.params.id },
            data: {
                title,
                summary,
                publishedDate,
                pages,
                authorId,
                bookGenres: {
                    deleteMany: {}, // Delete existing relations
                    create: genres.map((genreId) => ({
                        genre: { connect: { id: genreId } },
                    })),
                },
            },
            include: { author: true, bookGenres: { include: { genre: true } } },
        });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Book
router.delete('/:id', async (req, res) => {
    try {
        await prisma.bookGenre.deleteMany({
            where: { bookId: req.params.id },
        }); // Clean up related genres
        const book = await prisma.book.delete({
            where: { id: req.params.id },
        });
        res.send('Book deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

// this is sample merge for reverting