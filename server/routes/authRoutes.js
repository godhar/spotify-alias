const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/spotify', passport.authenticate('spotify', {
        scope: ['user-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public'], showDialog:true
    }));

    app.get('/auth/spotify/callback', passport.authenticate('spotify'),
    (req, res) => {
        // res.status(301).redirect("https://glacial-anchorage-42735.herokuapp.com/callback/success")
        res.status(301).redirect("http://localhost:4200/callback/success")//TODO change before deploy
    });

    app.get('/api/logout', async (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};