const isAuth = require('../middleWares/isAuth');
const spotifyService = require('../services/spotifyDataService');
const passport = require('passport');

module.exports = (app) => {

    app.get('/api/spotify/playlists', isAuth, async (req, res) => {
        const allUserPlaylists = await spotifyService.getPlaylistsForUser(req.user);
        return res.send(allUserPlaylists);
    });


    app.get('/api/spotify/playlist-item', isAuth, async (req, res) => {
        const playlist = await spotifyService.getSinglePlaylist(req.user, req.query);
        res.status(200).json({ payload: playlist });
    });

    app.get('/api/spotify/search-all-data', isAuth, async (req, res) => {
        const searchItem = await spotifyService.getSearchedForItem(req.user, req.query);
        res.status(200).json({ payload: searchItem });
    });
}
