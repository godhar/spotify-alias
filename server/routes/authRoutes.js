const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/spotify', passport.authenticate('spotify', {
        scope: ['user-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public'], showDialog:true
    }));

    //get the user profile with the access code
    app.get('/auth/spotify/callback', passport.authenticate('spotify'),
    (req, res) => {
        console.log('callback from spotify successful', req.user);
        res.status(301).redirect("https://glacial-anchorage-42735.herokuapp.com/callback/success")
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        req.user = undefined;
        req.session = null;
        res.send(req.user)
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};