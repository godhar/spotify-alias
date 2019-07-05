
const mongoose = require('mongoose');
const UserCredential = mongoose.model('userCredential');
const keys = require('../config/keys');
const axios = require('axios');
const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const utils = require('./utilsService');


const getPlaylists = async (user) => {

    let userCreds = await getUserCredentials(user);
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


const getSinglePlaylistItem = async (user, params) => {//DUP above

    const queryParams = params;

    const courseId = queryParams.playlistId,
        filter = queryParams.filter || '',
        sortOrder = queryParams.sortOrder,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize);

    let userCreds = await getUserCredentials(user);

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

            return {
                playlist_name: playlistData.data.name,
                track_name: t.track.name,
                album_info: {
                    album_name: t.track.album.name,
                    related_albums: t.track.album.href
                },
                artists: {
                    artist_name: t.track.artists[0].name,
                    full_artist_info: t.track.artists[0].href
                },
                track_duration: utils.convertMillisToSec(t.track.duration_ms),
                track_number: t.track.track_number,
                track_uri: t.track.uri
            };
        });
        //add filter option as well
        if (sortOrder === 'asc') {
            trackData.sort((a, b) => a.track_number - b.track_number);
        } else {
            trackData.sort((a, b) => b.track_number - a.track_number);
        }
    }

    const initialPosition = pageNumber * pageSize;

    const playlistPage = trackData.slice(initialPosition, initialPosition + pageSize);


    return playlistPage;
}

const getTracksFromAlbum = async (user, params) => {
    let userCreds = await getUserCredentials(user);
    let status = await tryForSelectedTracksByAlbum(params, user);

    if (status.statusCode === 401) {
        const newAccessToken = await refreshAccessToken(userCreds.refreshToken, user);
        userCreds.accessToken = newAccessToken;
        await userCreds.save();
        status = await tryForSelectedTracksByAlbum(params, userCreds);
    }

    const searchResponseData = status;

    return utils.modifyResponseSearchData(searchResponseData, params.type);
}


const getSearchedItem = async (user, params) => {
    let userCreds = await getUserCredentials(user);
    const queryParams = params;
    const reqParams = new URLSearchParams();

    reqParams.append('type', queryParams.type);//must be comma seperated list
    reqParams.append('q', queryParams.q);
    reqParams.append('limit', '50');

    let status = await tryFetchForSearchItem(userCreds.accessToken, reqParams);
    if (status.statusCode === 401) {
        const newAccessToken = await refreshAccessToken(userCreds.refreshToken, user);
        userCreds.accessToken = newAccessToken;
        await userCreds.save();
        status = await tryFetchForSearchItem(newAccessToken, reqParams);
    }

    const searchResponseData = status;

    return utils.modifyResponseSearchData(searchResponseData, queryParams.type);

}


const getNewArtistData = async (paramsData, user) => {
    const userCreds = getUserCredentials(user);
    let status = searchForArtistData(user.access_token, paramsData);

    if (status.statusCode === 401) {
        const newAccessToken = await refreshAccessToken(userCreds.refreshToken, user);
        userCreds.accessToken = newAccessToken;
        await userCreds.save();
        status = await searchForArtistData(newAccessToken, paramsData);
    }

    const searchResponseData = status;

    return utils.modifyResponseSearchData(searchResponseData, paramsData.type);


}

async function searchForArtistData(accessToken, query) {
    let data;
    let qUrl = 'https://api.spotify.com/v1/artists/';

    if (query.type === 'albums') {
        qUrl += (query.artistId + '/albums');
    }
    if (query.type === 'top-tracks') {
        qUrl += (query.artistId + '/top-tracks');
    }

    try {
        data = await axios.get(qUrl,
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

    return data;
}


async function tryFetchForSearchItem(accessToken, reqParams) {
    let response;
    try {
        response = await axios.get('https://api.spotify.com/v1/search',
            {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                },
                params: reqParams
            });

    } catch (err) {
        if (err.response.status === 401) {
            return { statusCode: 401 };
        }
        console.error(err);
    }

    return response.data;
}


async function tryForSelectedTracksByAlbum(query, userCreds) {
    let tracks;

    try {
        tracks = await axios.get('https://api.spotify.com/v1/albums/' + query.id + '/tracks',
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
    return tracks.data;
}



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


async function getUserCredentials(user) {
    const userCreds = await UserCredential.findOne({ userId: user.spotifyId });
    return userCreds;
}



module.exports = {
    getPlaylistsForUser: getPlaylists,
    getSinglePlaylist: getSinglePlaylistItem,
    getSearchedForItem: getSearchedItem,
    getTracksByAlbum: getTracksFromAlbum,
    getDataByArtist: getNewArtistData
};

