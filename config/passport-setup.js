const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate')
const mongoose = require('mongoose')
//require('../models/User')

// Model de usuário do Google
const googleSchema = new mongoose.Schema({
    googleId: String,
    email: Object,
    name: String,
    usuario: String,
    photo: Object
})

googleSchema.plugin(findOrCreate);

const UserGoogle = mongoose.model('googleUser', googleSchema); 

// Login com o Google
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},function(accessToken, refreshToken, profile, done) {
    UserGoogle.findOrCreate({ googleId: profile.id, email: profile.emails, name: profile.displayName, usuario: profile.name.givenName, surName: profile.name.familyName, photo: profile.photos }, function (err, user) {
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

// Model de usuário do Twitter
const twitterSchema = new mongoose.Schema({
    twitterId: String,
    name: String,
    usuario: String,
    location: String,
    photo: Object
})

twitterSchema.plugin(findOrCreate);

const UserTwitter = mongoose.model('twitterUser', twitterSchema); 


// Login com o Facebook
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
},function(accessToken, refreshToken, profile, done) {
    UserTwitter.findOrCreate({ twitterId: profile.id, name: profile.displayName, usuario: profile.username, location: profile.location, photo: profile.photos }, function (err, user) {
      return done(err, user);
    });
}
));

passport.serializeUser((user, done)=>{k
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    UserTwitter.findById(id, (err, user)=>{
        done(err, user)
    })
})
