const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/spotify', passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public'], show_dialog:true
    }));

    //get the user profile with the access code
    app.get('/auth/spotify/callback', passport.authenticate('spotify'),
    (req, res) => {
        console.log('callback from spotify successful', req.user);
        res.status(301).redirect("http://localhost:4200/callback/success")
    });

    app.get('/api/logout', (req, res) => {
        console.log(req.user);
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        console.log('checking user at api/current_user', req.user);
        res.send(req.user);
    });
};