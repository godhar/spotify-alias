const isAuth = require('../middleWares/isAuth');
const spotifyService = require('../services/spotifyDataService');
const passport = require('passport');

module.exports = (app) => {

 app.get('/api/spotify/playlists', isAuth, (req, res) => {

    let allUserPlayLists = spotifyService.getPlaylistsForUser(req.user);
    console.info('Sending playlists to front');

    return res.send(allUserPlayLists);    
 });



}