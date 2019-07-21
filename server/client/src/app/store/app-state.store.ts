import {Store} from "rxjs-observable-store";
import {Injectable} from "@angular/core";
import {Album, Artist, Playlist} from "../models/spotifyData.model";
import {AppGlobalState} from "./app-global-state";

@Injectable()
export class AppStateStore extends Store<AppGlobalState> {

  constructor () {
    super(new AppGlobalState());
  }

  addCurrentPlaylist(playlist: Playlist) {
    console.log('state is being set ', playlist);
    this.setState({...this.state, currentPlaylist: playlist});
  }

  addCurrentEntity(entity: Artist|Album) {
    console.log('state is being set ', entity);
    this.setState({...this.state, currentEntity: entity});
  }
}
