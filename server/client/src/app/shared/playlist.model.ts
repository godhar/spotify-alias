export class Playlist {
    constructor(public name: string, public imageg: string[], public tracks: any) { }
}

export interface Track {
    url: string;
    total: number;
}