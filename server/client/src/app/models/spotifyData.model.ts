
export class Album {
    constructor(public name: string, public artists: Artist[],  public image: string[], public release_date: string, public tracks?: Track[]){}
}

export class Artist {
    constructor(public name: string, public image: string[], public genres: string[]){}
}

export class Track {
    constructor(public name: string, public album: Album, public artist: {name: string, id: string}){}
}

export class Playlist {
    constructor(public name: string, public image: string[], public tracks: any, public playlistId: string) { }
}