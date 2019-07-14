const axios = require('axios');
const {URLSearchParams} = require('url');
const utils = require('./utilsService');
const TokenService = require('./accessTokenService');


const getPlaylists = async (user) => {

    let userCreds = await TokenService.getUserCredentials(user);
    let status = await tryFetchForPlaylists(userCreds);

    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await tryFetchForPlaylists(userCreds);
    }

    const playlistData = status;


    if (playlistData && playlistData.data && playlistData.data.items) {
        return playlistData.data.items.map((p) => {
            let images = [];
            p.images.forEach((i) => {
                images.push(i.url);
            });

            return {
                playlist_id: p.id,
                name: p.name,
                images: images,
                snapshot_id: p.snapshot_id,
                tracks: {url: p.tracks.href, total: p.tracks.total}
            };
        });
    }
};


const getSinglePlaylistItem = async (user, params) => {//DUP above

    const queryParams = params;

    const courseId = queryParams.playlistId,
        filter = queryParams.filter || '',
        sortOrder = queryParams.sortOrder,
        pageNumber = parseInt(queryParams.pageNumber) || 0,
        pageSize = parseInt(queryParams.pageSize);

    let userCreds = await TokenService.getUserCredentials(user);

    let status = await tryFetchForSinglePlaylist(userCreds, queryParams.playlistId);

    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await tryFetchForSinglePlaylist(userCreds, queryParams.playlistId);
    }

    const playlistData = status;
    let trackData;


    if (playlistData && playlistData.data && playlistData.data.tracks.items) {

        trackData = playlistData.data.tracks.items.map((t, index) => {

            return {
                position: index,
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
            trackData.sort((a, b) => a.position - b.position);
        } else {
            trackData.sort((a, b) => b.position - a.position);
        }
    }

    const initialPosition = pageNumber * pageSize;

    const playlistPage = trackData.slice(initialPosition, initialPosition + pageSize);


    return playlistPage;
};


const getTracksFromAlbum = async (user, params) => {
    let userCreds = await TokenService.getUserCredentials(user);
    let status = await tryForSelectedTracksByAlbum(params, user);

    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await tryForSelectedTracksByAlbum(params, userCreds);
    }

    const searchResponseData = status;

    return utils.modifyResponseSearchData(searchResponseData, params.type);
};


const getSearchedItem = async (user, params) => {
    let userCreds = await TokenService.getUserCredentials(user);
    const queryParams = params;
    const reqParams = new URLSearchParams();

    reqParams.append('type', queryParams.type);//must be comma seperated list
    reqParams.append('q', queryParams.q);
    reqParams.append('limit', '50');

    let status = await tryFetchForSearchItem(userCreds.accessToken, reqParams);

    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await tryFetchForSearchItem(userCreds.accessToken, reqParams);
    }

    const searchResponseData = status;

    return utils.modifyResponseSearchData(searchResponseData, queryParams.type);

};


const getNewArtistData = async (paramsData, user) => {
    const userCreds = TokenService.getUserCredentials(user);
    let status = await searchForArtistData(userCreds.accessToken, paramsData);

    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await searchForArtistData(userCreds.accessToken, paramsData);
    }

    const searchResponseData = status;

    return utils.modifyResponseSearchData(searchResponseData, paramsData.type);
};


const deletePlaylistItem = async (user, queryParam) => {
    const userCreds = await TokenService.getUserCredentials(user);
    let status = await deleteTrackByUri(userCreds.accessToken, queryParam);
    console.log('YES AND STATUS IS FFK', status);
    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await deleteTrackByUri(userCreds.accessToken, queryParam);
    }
    console.log('should be returning status?????');
    console.log(status);

    return status;
};


const getTracksArtistAlbum = async (user, queryParam) => {
    const userCreds = await TokenService.getUserCredentials(user);
    console.log('QQ (service ) ======= ', queryParam);
    let status = await getTracks(userCreds.accessToken, queryParam);

    console.log('YES AND STATUS IS FFK', status);
    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await getTracks(userCreds.accessToken, queryParam);
    }

    console.log(status);

    return status;
};


async function getTracks(accessToken, reqParam) {
    let data;
    const qUrl = `https://api.spotify.com/v1/${reqParam.type}s/${reqParam.id}/` + (reqParam.type === `artist` ? `top-tracks?country=${reqParam.iso}` : `tracks`);
    console.log('req param == ', reqParam);
    console.log('qUrl ===== ', qUrl)

    try {
        data = await axios.get(qUrl, {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        if (error.response.status === 401) {
            return {statusCode: 401};
        }
        console.error(error)
    }

    const res = await data;
    console.log('resso -- ', res)
    const modData = utils.modifyFullTrackData(res['data']);
    return {data: modData};
}


async function deleteTrackByUri(accessToken, reqParam) {

    let res;
    const qUrl = 'https://api.spotify.com/v1/playlists/' + reqParam.playlist_id + '/tracks';
    const reqData = '{"tracks": [{"uri": "' + reqParam.track_uri + '"}]' + ',"snapshot_id":"' + reqParam.snapshot_id + '"}';

    try {
        res = await axios.delete(qUrl, {
            data: reqData,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        if (error.response.status === 401) {
            return {statusCode: 401};
        }
        console.error(error)
    }
    return {status: res.status, snapshot_id: res.data.snapshot_id};
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
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            });

    } catch (err) {
        if (err.response.status === 401) {
            return {statusCode: 401};
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
            return {statusCode: 401};
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
            return {statusCode: 401};
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
            return {statusCode: 401};
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
            return {statusCode: 401};
        }
    }

    return playlistData;
}


module.exports = {
    getPlaylistsForUser: getPlaylists,
    getSinglePlaylist: getSinglePlaylistItem,
    getSearchedForItem: getSearchedItem,
    getTracksByAlbum: getTracksFromAlbum,
    getDataByArtist: getNewArtistData,
    deletePlaylistTrack: deletePlaylistItem,
    getTracksByAlbumArtist: getTracksArtistAlbum
};

