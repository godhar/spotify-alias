const isAuth = require('../middleWares/isAuth');
const spotifyService = require('../services/spotifyDataService');
const passport = require('passport');

module.exports = (app) => {

 app.get('/api/spotify/playlists', isAuth, async (req, res) => {
    let allUserPlayLists = await spotifyService.getPlaylistsForUser(req.user);
    return res.send(allUserPlayLists);    
 });



}