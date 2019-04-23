export class PlaylistItem {

    albumInfo: PlayListAlbum;
    artist: PlayListArtist;
    playlistName: string;
    trackNumber: number;
    trackDuration: string;

    constructor(public album: PlayListAlbum, public artists: PlayListArtist, public name: string, public trackNum: number, public trackLength: string) {
        this.albumInfo = album;
        this.artists = artists;
        this.playlistName = name;
        this.trackNumber = trackNum;
        this.trackDuration = trackLength;
    }
}


export interface PlayListArtist {
    artistName: string,
    relatedArtists: string
}

export interface PlayListAlbum {
    albumName: string,
    relatedAlbums: string
}

