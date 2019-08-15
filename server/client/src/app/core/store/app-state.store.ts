import {Store} from "rxjs-observable-store";
import {Injectable} from "@angular/core";
import {Album, Artist, Playlist} from "../../models/spotifyData.model";
import {AppGlobalState} from "./app-global-state";

@Injectable()
export class AppStateStore extends Store<AppGlobalState> {

  constructor () {
    super(new AppGlobalState());
  }

  addCurrentPlaylist(playlist: Playlist) {
    this.setState({...this.state, currentPlaylist: playlist});
  }

  addCurrentEntity(entity: Artist|Album) {
    this.setState({...this.state, currentEntity: entity});
  }

  addCurrentUser(spotifyUser: string) {
    this.setState({...this.state, currentUser: spotifyUser});
  }

  addCurrentRoute(route: string) {
    this.setState({...this.state, currentRoute: route});
  }
}
