const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate')

// Model de usuário
const mongoose = require('mongoose')
require('../models/User')

const userSchema = new mongoose.Schema({
    googleId: String,
    userName: String
})

userSchema.plugin(findOrCreate); // Erro: findOrCreate não é uma função

// const User = mongoose.model('user', userSchema); Erro: Não pode substituir o model 'user' uma vez compilado

// Login com o Google
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},function(accessToken, refreshToken, profile, done) {
    Click.findOrCreate({ googleId: profile.id, userName: profile.displayName }, function (err, user) {
        return done(err, user);
    });
}
));

passport.serializeUser((user, done)=>{

    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user)
    })
})