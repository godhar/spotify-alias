import {Deserializable} from "./deserializable.model";

export class Album {
    constructor(public name: string, public artists: Artist[],  public image: string[], public release_date: string, public tracks?: Track[]){}
}

export class Artist {
    constructor(public name: string, public image: string[], public genres: string[]){}
}

export class Track {
    constructor(public name: string, public album: Album, public artist: {name: string, id: string}){}
}

export class Playlist implements Deserializable {

    public name: string;
    public images: string[];
    public tracks: {total: number, url: string};
    public playlist_id: string;
    public snapshot_id: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

