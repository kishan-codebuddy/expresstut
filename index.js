const express = require('express')
require('dotenv').config();
const path = require('path')
const bookRouter = require('./routes/book.js');
const authorRouter = require('./routes/author.js');
const genreRouter = require('./routes/genre.js');
const {connectMongo} = require("./db_connection.js");
const app = express()

const port = process.env.PORT;



app.use(express.json());
app.use("/books",bookRouter);
app.use("/authors",authorRouter);
app.use("/genres",genreRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});