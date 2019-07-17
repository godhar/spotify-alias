export class Playlist {
    constructor(public name: string, public image: string[], public tracks: any, public playlistId: string) { }
}

export interface Track {
    url: string;
    total: number;
}