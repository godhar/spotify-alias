
module.exports.convertMillisToSec = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

module.exports.modifyResponseSearchData = (data, qType) => {

    let modifiedData = [];

    if (qType === 'album') {
        console.log('in the loop')
        data.albums.items.forEach((item) => {
            modifiedData.push({ id: item.id, type: item.type, href: item.external_urls.spotify, img: mapImages(item.images), name: item.name, total_tracks: item.total_tracks })
        });
    }

    if (qType === 'artist') {
        data.artists.items.forEach((item) => {
            modifiedData.push({ id: item.id, type: item.type, href: item.external_urls.spotify, name: item.name, total_tracks: item.total_tracks })
        });
    }

    if (qType === 'track' || qType === 'top-tracks') {
        data.tracks.items.forEach((item) => {
            modifiedData.push({ id: item.id, type: item.type, href: item.external_urls.spotify, name: item.name, total_tracks: item.total_tracks })
        });
    }

    if (qType === 'album-tracks') {
        data.tracks.items.forEach((item) => {
            modifiedData.push({ id: item.id, type: item.type, href: item.external_urls.spotify, name: item.name, total_tracks: item.total_tracks })
        });

    }

    return modifiedData;

}

function mapImages(items) {
    return items.map((i) => i.url);
}
