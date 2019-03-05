const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user);
    });
});

passport.use(new SpotifyStrategy({
    clientID: keys.spotifyClientID,
    clientSecret: keys.spotifyClientSecret,
    callbackURL: 'http://localhost:5000/auth/spotify/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile.id)

    User.findOne({ spotifyId: profile.id }).then((existingUser) => {
        if (existingUser) {
            done(null, existingUser);
        }
        else {
            new User({ spotifyId: profile.id }).save()
                .then((user) => done(null, user));
        }
    });

}));