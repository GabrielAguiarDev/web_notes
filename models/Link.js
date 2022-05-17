const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Links = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("links", Links)