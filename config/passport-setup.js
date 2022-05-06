const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate')
const mongoose = require('mongoose')
//require('../models/User')

// Model de usuário do Google
const googleSchema = new mongoose.Schema({
    googleId: String,
    email: Object,
    userName: String,
    oneName: String,
    surName: String,
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

// Model de usuário do Facebook
//require('../models/User')
const facebookSchema = new mongoose.Schema({
    facebookId: String,
    email: Object,
    userName: String,
    oneName: String,
    surName: String,
    photo: Object
})

facebookSchema.plugin(findOrCreate);

const UserFacebook = mongoose.model('facebookUser', facebookSchema); 


// Login com o Facebook
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']
},function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    UserFacebook.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
}
));

passport.serializeUser((user, done)=>{k
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    UserFacebook.findById(id, (err, user)=>{
        done(err, user)
    })
})
