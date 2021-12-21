const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Notes = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("notes", Notes)