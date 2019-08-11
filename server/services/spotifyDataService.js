const axios = require('axios');
const {URLSearchParams} = require('url');
const utils = require('./utilsService');
const TokenService = require('./accessTokenService');
const fetch = require('node-fetch');


const getPlaylists = async (user) => {

    let userCreds = await TokenService.getUserCredentials(user);
    let status = await tryFetchForPlaylists(userCreds);
    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await tryFetchForPlaylists(userCreds);
    }

    const playlistData = status;
    //TODO put below in utils service
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

    return trackData.slice(initialPosition, initialPosition + pageSize);

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
    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await deleteTrackByUri(userCreds.accessToken, queryParam);
    }
    return status;
};


const getTracksArtistAlbum = async (user, queryParam) => {
    const userCreds = await TokenService.getUserCredentials(user);
    let status = await getTracks(userCreds.accessToken, queryParam);

    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await getTracks(userCreds.accessToken, queryParam);
    }
    return status;
};


const addTrackToPlaylist = async (user, queryParams) => {
    const userCreds = await TokenService.getUserCredentials(user);
    let status = await updatePlaylist(userCreds.accessToken, queryParams);
    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await updatePlaylist(userCreds.accessToken, queryParams);
    }
    return status;
};


async function updatePlaylist(accessToken, reqParams) {
    console.log('PARAMS _', reqParams);
    console.log('token _', accessToken);
    console.log('trying...');
    const url = `https://api.spotify.com/v1/playlists/${reqParams.playlist_id}/tracks?uris=${reqParams.track_uri}&position=0`;

    const settings = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(url, settings);

    if (!response.ok) throw Error(response.message);

    try {
        const data = await response.json();
        console.log('response data == ', data)
        return data;
    } catch (err) {
        throw err;
    }
}


const createNewPlaylist = async (user, queryParams) => {
    const userCreds = await TokenService.getUserCredentials(user);
    let status = await newPlaylist(userCreds, queryParams);
    if (status.statusCode === 401) {
        userCreds.accessToken = await TokenService.getNewToken(userCreds);
        status = await newPlaylist(userCreds, queryParams);
    }
    return status;
};


async function newPlaylist(userCreds, reqParams) {//TODO test use fetch
    console.log('PARAMS _', reqParams);
    console.log('user creds _', userCreds);
    console.log('trying create new playlist..');

    reqParams.name = 'new pl name test';

    const url = `https://api.spotify.com/v1/users/${userCreds.userId}/playlists`;
    const reqData = {name: reqParams.name};

    return axios.post(url, {
        headers: {
            'Authorization': 'Bearer ' + userCreds.accessToken,
            'Content-Type': 'application/json',
            'Content-Length': '0'
        },
        data: reqData
    }).then((response) => {
        console.log('response promise is ', response)
        return response;

    }).catch(err => {
        console.log('errrring ', err)
        if (err.response.status === 401) {
            return {statusCode: 401};
        }
        console.error(err);
        throw new Error('Create new playlist call failed');
    });
}


async function getTracks(accessToken, reqParam) {
    let data;
    const qUrl = `https://api.spotify.com/v1/${reqParam.type}s/${reqParam.id}/` + (reqParam.type === `artist` ? `top-tracks` : `tracks`) + `?country=${reqParam.iso}`;

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
    const modData = utils.modifyFullTrackData(res['data'], reqParam.type);
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
        throw Error(err.response)
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

    return axios.get('https://api.spotify.com/v1/users/' + usersCred.userId + '/playlists',
        {
            headers: {
                'Authorization': 'Bearer ' + usersCred.accessToken,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
        if (res.status === 200) {
            return res;
        }

    }).catch(err => {
        if (err.response.status === 401) {
            return {statusCode: 401};
        }
        throw new Error('Get all play lists call failed');
    });
}

module.exports = {
    getPlaylistsForUser: getPlaylists,
    getSinglePlaylist: getSinglePlaylistItem,
    getSearchedForItem: getSearchedItem,
    getTracksByAlbum: getTracksFromAlbum,
    getDataByArtist: getNewArtistData,
    deletePlaylistTrack: deletePlaylistItem,
    getTracksByAlbumArtist: getTracksArtistAlbum,
    addTrackToPlaylist: addTrackToPlaylist,
    newUserPlaylist: createNewPlaylist
};

