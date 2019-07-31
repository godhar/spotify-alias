import {Album, Artist, Playlist} from "../models/spotifyData.model";


export class AppGlobalState {
  currentPlaylist: Playlist = new Playlist();
  currentEntity: Artist|Album = new Artist();
  currentUser: string = '';
}
