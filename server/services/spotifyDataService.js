const mongoose = require('mongoose');
const User = mongoose.model('users');
const UserCredential = mongoose.model('userCredential');
const SpotifyWebApi = require('spotify-web-api-node');
const keys = require('../config/keys');
const axios = require('axios');
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');


const getPlaylists = async (user) => {

    let playlistData;

    let userCreds = await getUserCreds(user);
    // console.log('AT top!!! ',userCreds);

    let status = await tryFetchForPlaylist(userCreds);

    if (status.statusCode === 401) {
        let newAccessToken = await refreshAccessToken(userCreds.refreshToken, userCreds.userId);
        userCreds.accessToken = newAccessToken;
        status = await tryFetchForPlaylist(userCreds);
    }

    playlistData = status;


    if (playlistData && playlistData.data && playlistData.data.items) {

        return playlistData.data.items.map((p) => {
            let images = [];
            p.images.forEach((i) => {
                images.push(i.url);
            });

            return { name: p.name, image: images, tracks: { url: p.tracks.href, total: p.tracks.total } };
        });
    }
}

async function tryFetchForPlaylist(usersCred) {

    let playlistData;

    try {
        playlistData = await axios.get('https://api.spotify.com/v1/users/' + usersCred.userId + '/playlists',
            {
                headers: {
                    'Authorization': 'Bearer ' + usersCred.accessToken,
                    'Content-Type': 'application/json'
                }
            });

    } catch (err) {
        if (err.response.status === 401) {
            return { statusCode: 401 };
        }
        console.error(err);
    }

    return playlistData;
}


async function refreshAccessToken(refreshTok, appUser) {

    console.log('||||||||||||||||| call =++++++++++++++++++++++++++++++++++');
    let newAccessData;

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshTok);

    try {
        newAuthUserData = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: params,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + Buffer.from(`${keys.spotifyClientID}:${keys.spotifyClientSecret}`).toString('base64')
            }
        }).then(res => {
            return res.json();
        });
    } catch (err) {
        console.error(err);
    }

    // save new access token to user
    const user = await UserCredential.findOne({ userId: appUser });
    user.accessToken = newAuthUserData.accessToken;
    user.save();

    return newAuthUserData.accessToken;
}


async function getUserCreds(user) {
    const userCreds = await UserCredential.findOne({ userId: user.spotifyId });

    return userCreds;
}

module.exports = { getPlaylistsForUser: getPlaylists }