const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate')

// Model de usuário
const mongoose = require('mongoose')
require('../models/User')

const userSchema = new mongoose.Schema({
    googleId: String,
    email: Object,
    userName: String,
    oneName: String,
    surName: String,
    photo: Object
})

userSchema.plugin(findOrCreate); // Erro: findOrCreate não é uma função

const UserGoogle = mongoose.model('googleUser', userSchema); 

// Login com o Google
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},function(accessToken, refreshToken, profile, done) {
    UserGoogle.findOrCreate({ googleId: profile.id, email: profile.emails, userName: profile.displayName, oneName: profile.name.givenName, surName: profile.name.familyName, photo: profile.photos }, function (err, user) {
        return done(err, user);
    });
}   
));

passport.serializeUser((user, done)=>{k

    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    UserGoogle.findById(id, (err, user)=>{
        done(err, user)
    })
})