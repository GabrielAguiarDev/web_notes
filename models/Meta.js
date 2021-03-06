const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Metas = new Schema({
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
    dataPrevista: {
        type: Date
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("metas", Metas)