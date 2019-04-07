const mongoose = require('mongoose');
const User = mongoose.model('users');
const UserCredential = mongoose.model('userCredential');
const SpotifyWebApi = require('spotify-web-api-node');
const keys = require('../config/keys');
const axios = require('axios');


const getPlaylists = async (user) => {

    let userCreds = await initiateSpotifyWebApi(user);
    let playlistData;

    try {
        playlistData = await axios.get('https://api.spotify.com/v1/users/' + userCreds.userId + '/playlists',
            {
                headers: {
                    'Authorization': 'Bearer ' + userCreds.accessToken,
                    'Content-Type': 'application/json'
                }
            });

    } catch (err) {
        console.info(err);
        if (err.response.status === 401) {
            let newAccessToken = refreshAccessToken(userCreds.refreshToken, userCreds.userId);
        }
    }

    return playlistData.data.items.map((p) => {
        let images = [];
        p.images.forEach((i) => {
            images.push(i.url);
        });

        return { name: p.name, image: images, tracks: { url: p.tracks.href, total: p.tracks.total } };
    });

}


async function refreshAccessToken(refreshTok, user) {

    console.log('refresh access token call');

    let newToken;

    try {

        newToken = await axios.post('https://accounts.spotify.com/api/token',
            {
                params: {
                    'grant_type': 'refresh_token',
                    'refresh_token': refreshTok
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${keys.spotifyClientID}:${keys.spotifyClientSecret}`).toString('base64')
                }
            });
    } catch (err) {
        console.error('ERROR CODE', err.response.status);
        console.error(err)
    }

    console.log('ANy new tokens === ', newToken)

    //save new access token to user
    const user = await UserCredential.findOne({ userId: user });
    user.accessTok = newToken;

    user.save();
}


async function initiateSpotifyWebApi(user) {
    const userCreds = await UserCredential.findOne({ userId: user.spotifyId });

    return userCreds;
}

module.exports = { getPlaylistsForUser: getPlaylists }