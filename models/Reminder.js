const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Reminders = new Schema({
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String
    },
    dataReminder: {
        type: Date,
        required: true
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

mongoose.model("reminders", Reminders)