module.exports.modifyResponseSearchData = (data, qType) => {

    const modifiedData = [];

    console.log('query type ====*= ', qType);

    if (qType === 'album') {
        data.albums.items.forEach((item) => {
            modifiedData.push({
                id: item.id,
                album_type: item.album_type,
                type: item.type,
                full_album: item.href,
                artist: item.artists[0].name,
                release_date: item.release_date,
                img: mapImages(item.images),
                name: item.name,
                total_tracks: item.total_tracks
            })
        });
    }

    if (qType === 'artist') {
        data.artists.items.forEach((item) => {
            modifiedData.push({
                id: item.id,
                type: item.type,
                full_artist: item.href,
                img: mapImages(item.images),
                name: item.name
            })
        });
    }

    if (qType === 'track' || qType === 'top-tracks') {
        data.tracks.items.forEach((item) => {
            modifiedData.push({
                id: item.id,
                type: item.type,
                img: mapImages(item.album.images),
                artist: item.artists[0].name,
                album: item.album.name,
                name: item.name
            })
        });
    }

    if (qType === 'album-tracks') {
        data.tracks.items.forEach((item) => {
            modifiedData.push({
                id: item.id,
                type: item.type,
                href: item.external_urls.spotify,
                name: item.name,
                total_tracks: item.total_tracks
            })
        });

    }

    return modifiedData;
};


export const modifyFullTrackData = (rawData, entityType) => {

    if (entityType === 'artist') {


        return rawData.tracks.map((track) => {
            return {
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                external_urls: track.external_urls.spotify,
                duration: convertMillisToSec(track.duration_ms),
                type: track.type,
                track_uri: track.uri
            };

        });

    }
    return rawData.items.map((track) => {

        return {
            name: track.name,
            artist: track.artists[0].name,
            external_urls: track.external_urls.spotify,
            duration: convertMillisToSec(track.duration_ms),
            type: track.type,
            track_uri: track.uri
        };
    })
};


function mapImages(items) {
    return items.map((i) => i.url);
}

export const convertMillisToSec = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

