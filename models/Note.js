const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Notes = new Schema({
    titulo: {
        type: String
    },
    conteudo: {
        type: String
    },
    trash: [
        {
            titulo: {
                type: String,
                required: true
            }, 
            conteudo: {
                type: String,
                required: true
            }
        }
    ],
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

mongoose.model("notes", Notes)