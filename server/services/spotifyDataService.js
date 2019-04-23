const mongoose = require('mongoose');
const User = mongoose.model('users');
const UserCredential = mongoose.model('userCredential');
const SpotifyWebApi = require('spotify-web-api-node');
const keys = require('../config/keys');
const axios = require('axios');
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');


const getPlaylists = async (user) => {

    let userCreds = await getUserCreds(user);
    let status = await tryFetchForPlaylists(userCreds);

    if (status.statusCode === 401) {
        let newAccessToken = await refreshAccessToken(userCreds.refreshToken, userCreds.userId);
        userCreds.accessToken = newAccessToken;
        await userCreds.save();
        status = await tryFetchForPlaylists(userCreds);
    }

    const playlistData = status;


    if (playlistData && playlistData.data && playlistData.data.items) {
        return playlistData.data.items.map((p) => {
            let images = [];
            p.images.forEach((i) => {
                images.push(i.url);
            });

            return { playlistId: p.id, name: p.name, image: images, tracks: { url: p.tracks.href, total: p.tracks.total } };
        });
    }
}


const getSelectPlaylist = async (user, playlistId) => {

    let userCreds = await getUserCreds(user);

    let status = await tryFetchForSinglePlaylist(userCreds, playlistId);

    if (status.statusCode === 401) {
        let newAccessToken = await refreshAccessToken(userCreds.refreshToken, userCreds.userId);
        userCreds.accessToken = newAccessToken;
        await userCreds.save();
        status = await tryFetchForSinglePlaylist(userCreds, playlistId);
    }

    const playlistData = status;

    if (playlistData && playlistData.data && playlistData.data.tracks.items) {

        return playlistData.data.tracks.items.map((t) => {

            return { playlist_name: playlistData.data.name, track_name: t.track.name, album_info: { album_name: t.track.album.name, related_albums: t.track.album.href }, artists: { name: t.track.artists[0].name, all_artists: t.track.artists[0].href }, track_length: convertToSec(t.track.duration_ms), track_num: t.track.track_number };
        });

    }
}


async function getSinglePlaylistSingle(user, params) {//DUP above

    const queryParams = params;

    const courseId = queryParams.playlistId,
        filter = queryParams.filter || '',
        sortOrder = queryParams.sortOrder,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize);

    let userCreds = await getUserCreds(user);

    let status = await tryFetchForSinglePlaylist(userCreds, queryParams.playlistId);

    if (status.statusCode === 401) {
        let newAccessToken = await refreshAccessToken(userCreds.refreshToken, userCreds.userId);
        userCreds.accessToken = newAccessToken;
        await userCreds.save();
        status = await tryFetchForSinglePlaylist(userCreds, queryParams.playlistId);
    }

    const playlistData = status;
    let trackData;


    if (playlistData && playlistData.data && playlistData.data.tracks.items) {

        trackData = playlistData.data.tracks.items.map((t) => {

            return { playlist_name: playlistData.data.name, track_name: t.track.name, album_info: { album_name: t.track.album.name, related_albums: t.track.album.href }, artists: { name: t.track.artists[0].name, all_artists: t.track.artists[0].href }, track_length: convertToSec(t.track.duration_ms), track_num: t.track.track_number };
        });
        //add filter option as well
        if (sortOrder === 'asc') {
            trackData.sort((a, b) => a.track_num - b.track_num);
        } else {
            trackData.sort((a, b) => b.track_num - a.track_num);
        }
    }

    const initialPosition = pageNumber * pageSize;

    const playlistPage = trackData.slice(initialPosition, initialPosition + pageSize);

    console.log('POOOOO ------ ',playlistPage)

    return playlistPage;
}

function convertToSec(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// async function getPlaylistImage(playlistId, user) {
//     const tryPlaylistImg = await tryFetchForPlaylistImage(playlistId, user);

//     if (tryPlaylistImg.statusCode === 401) {
//         const newToken = await refreshAccessToken(user.refreshToken, user);
//         user.accessToken = newToken;
//         user.save();
//         const retryFetch = await tryFetchForPlaylistImage(playlistId, user);

//         if (!retryFetch.statusCode) {
//             return retryFetch;
//         }
//     }
// }

// async function tryFetchForPlaylistImage(pId, userConf) {
//     let playlistImg;

//     try {
//         playlistImg = await axios.get('https://api.spotify.com/v1/playlists/' + pId + '/images',
//             {
//                 headers: {
//                     'Authorization': 'Bearer ' + userConf.accessToken,
//                     'Content-Type': 'application/json'
//                 }
//             });

//     } catch (err) {
//         console.error(err);
//         if (err.response && err.response.status === 401) {
//             return { statusCode: 401 };
//         }
//     }

//     return playlistImg;
// }


async function tryFetchForSinglePlaylist(userCreds, playlistId) {
    let playlist;

    try {
        playlist = await axios.get('https://api.spotify.com/v1/playlists/' + playlistId,
            {
                headers: {
                    'Authorization': 'Bearer ' + userCreds.accessToken,
                    'Content-Type': 'application/json'
                }
            });

    } catch (err) {
        if (err.response.status === 401) {
            return { statusCode: 401 };
        }
        console.error(err);
    }

    return playlist;
}

async function tryFetchForPlaylists(usersCred) {

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
            console.error(err);
            return { statusCode: 401 };
        }
    }

    return playlistData;
}


async function refreshAccessToken(refreshTok, appUser) {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshTok);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${keys.spotifyClientID}:${keys.spotifyClientSecret}`).toString('base64'),
            'Accept': 'application/json'
        }
    });

    const newAuthUserData = await response.json();

    if (response.status !== 200) {
        console.error(`Invalid response status ${response.status}.`);
        throw newAuthUserData;
    }

    return newAuthUserData['access_token'];
}


async function getUserCreds(user) {
    const userCreds = await UserCredential.findOne({ userId: user.spotifyId });

    return userCreds;
}

module.exports = { getPlaylistsForUser: getPlaylists, getSinglePlaylist: getSelectPlaylist, getSinglePlaylistTest: getSinglePlaylistSingle }