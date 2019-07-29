const isAuth = require('../middleWares/isAuth');
const spotifyService = require('../services/spotifyDataService');

module.exports = (app) => {

    app.get('/api/spotify/playlists', isAuth, async (req, res) => {
        const allUserPlaylists = await spotifyService.getPlaylistsForUser(req.user);
        return res.send({payload: allUserPlaylists});
    });


    app.get('/api/spotify/playlist-item', isAuth, async (req, res) => {
        const playlist = await spotifyService.getSinglePlaylist(req.user, req.query);
        res.status(200).json({ payload: playlist });
    });


    app.get('/api/spotify/search-all-data', isAuth, async (req, res) => {
        const searchItem = await spotifyService.getSearchedForItem(req.user, req.query);
        res.status(200).json({ payload: searchItem });
    });


    app.get('/api/spotify/getTracksByAlbum', isAuth, async (req, res) => {
        const albums = await spotifyService.getTracksByAlbum(req.user, req.query);
        res.status(200).json({ payload: albums });
    });


     app.get('/api/spotify/getNewDataByArtist', isAuth, async (req, res) => {
        const searchItem = await spotifyService.getDataByArtist(req.user, req.query);
        res.status(200).json({ payload: searchItem });
    });


     app.get('/api/spotify/delete-playlist-track', isAuth, async (req, res) => {
         const data = await spotifyService.deletePlaylistTrack(req.user, req.query);
         res.status(200).json({ payload: data});
     });


     app.get('/api/spotify/tracks', isAuth, async (req, res) => {
         const data = await spotifyService.getTracksByAlbumArtist(req.user, req.query);
         res.status(200).json({ payload: data});
     });

    app.get('/api/spotify/add-track-playlist', isAuth, async (req, res) => {
        const data = await spotifyService.addTrackToPlaylist(req.user, req.query);
        res.status(200).json({ payload: data});
    });

    app.get('/api/spotify/new-playlist', isAuth, async (req, res) => {
        console.log('controller hit');
        const data = await spotifyService.newUserPlaylist(req.user, req.query);
        res.status(200).json({ payload: data});
    });


};


