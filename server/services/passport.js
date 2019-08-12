const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const UserCredential = mongoose.model('userCredential');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        });
});

passport.use(
    new SpotifyStrategy({
        clientID: keys.spotifyClientID,
        clientSecret: keys.spotifyClientSecret,
        callbackURL: '/auth/spotify/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {

        const spotifyId = profile.id;
        const name = profile.displayName || '';
        let user;


        const existingUser = await User.findOne({spotifyId: profile.id});
        console.log('existing user = ', existingUser);
        if (existingUser) {

            let userCredentials = await UserCredential.findOne({userId: spotifyId});

            if (userCredentials) {
                userCredentials.accessToken = accessToken;
                userCredentials.refreshToken = refreshToken;
                await userCredentials.save();
            }
            if (!userCredentials) {
                await new UserCredential({userId: spotifyId, name, accessToken, refreshToken}).save();
            }

            return done(null, existingUser);
        }

        if (!existingUser) {
            console.log('NOT existing user; spotifyID = ', spotifyId);
            user = await new User({spotifyId}).save();
            await new UserCredential({userId: spotifyId, name, accessToken, refreshToken}).save();
        }

        done(null, user);
    }));