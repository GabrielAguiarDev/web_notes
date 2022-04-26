const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


// Model de usuário
require('../models/User')
const User = mongoose.model('user')

module.exports = function(passport) {

    passport.use(new localStrategy({usernameField: 'user', passwordField: 'senha'}, (user, senha, done)=>{
        User.findOne({usuario: user}).then((usuario)=>{

            if(!usuario) {
                return done(null, false, ()=>{
                    console.log("Esta conta não existe")
                })
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem)=>{

                if(batem){
                    return done(null, usuario)
                } else {
                    return done(null, false, ()=>{
                        console.log("Senha incorreta")
                    })
                }
            })
        })
    }))

    passport.serializeUser((usuario, done)=>{

        done(null, usuario.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, usuario)=>{
            done(err, usuario)
        })
    })
}
