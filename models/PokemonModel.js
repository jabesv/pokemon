const mongoose = require('mongoose')

// * Create the Schema
const pokemonSquema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
})

//* Create the model
module.exports = mongoose.model('Pokemon', pokemonSquema)