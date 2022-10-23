const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mecaSchema = new Schema({
    speed: Number,
    mistakes: Number,
    indice: Number,
    date: Number
})

module.exports = mongoose.model('Meca', mecaSchema)