const isAuth = require('../middleWares/isAuth');
const spotifyService = require('../services/spotifyDataService');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/spotify/playlists', isAuth, async (req, res) => {
        const allUserPlaylists = await spotifyService.getPlaylistsForUser(req.user);
        return res.send(allUserPlaylists);
    });

    app.get('/api/spotify/playlist-item', isAuth, async (req, res) => {
        const playlist = await spotifyService.getSinglePlaylist(req.user, req.query.playlistId);
        return res.send(playlist);
    });

     app.get('/api/spotify/playlist-item-test', isAuth, async (req, res) => {
        const playlist = await spotifyService.getSinglePlaylistTest(req.user, req.query);
        console.log('how many tracks ==== ',playlist.length)
        res.status(200).json({payload: playlist});
    });

}

