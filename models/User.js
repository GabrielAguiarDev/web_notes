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
        required: true
    },
    eAdmin: {
        type: Number,
        default: 0
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

// Schema.pre('save',  function(next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);

//         // hash the password along with our new salt
//         bcrypt.hash(user.senha, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.senha = hash;
//             // user.verify = hash
//             next();
//         });
//     });
// });

mongoose.model("user", User)