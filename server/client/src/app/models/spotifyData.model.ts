import {Deserializable} from "./deserializable.model";

export class Album implements Deserializable {

  public id: string;
  public name: string;
  public artist: string;
  public type: string;
  public full_album: string;
  public img: string[];
  public release_date: string;
  public total_tracks: number;
  public album_type: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Artist implements Deserializable {

  public id: string;
  public name: string;
  public img: string[];
  public full_artist: string;
  public type: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Track {
    constructor(public name: string, public album: Album, public artist: {name: string, id: string}){}
}

export class Playlist implements Deserializable {

  public name: string;
  public images: string[];
  public tracks: { total: number, url: string };
  public playlist_id: string;
  public snapshot_id: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

