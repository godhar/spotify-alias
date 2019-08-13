import {Deserializable} from "./deserializable.model";


export class PlaylistItem implements Deserializable {

  public album_info: PlayListAlbum;
  public artists: PlayListArtist;
  public playlist_name: string;
  public track_number: number;
  public track_duration: string;
  public track_uri: string;
  public listen_uri: string;
  public track_name: string;

  deserialize(input: any) {
    Object.assign(this, input);
    this.album_info = new PlayListAlbum().deserialize(input.album_info);
    this.artists = new PlayListArtist().deserialize(input.artists);
    return this;
  }
}

export class PlayListAlbum implements Deserializable {

  public album_name: string;
  public related_albums: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}

export class PlayListArtist implements Deserializable {

  public artist_name: string;
  public full_artist_info: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}

