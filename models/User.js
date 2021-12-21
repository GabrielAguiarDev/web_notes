const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    nome: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        request: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("user", User)