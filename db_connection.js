const mongoose = require('mongoose')

async function connectMongo(){
    return mongoose.connect("mongodb://mongodb:27017/books")
}

module.exports = {connectMongo};