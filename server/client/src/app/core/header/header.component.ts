import {Component, OnDestroy} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {AppStateStore} from "../store/app-state.store";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {PlaylistService} from "../services/playlist.service";
import {Playlist} from "../../models/spotifyData.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  currentRoute: string;
  activePlaylist: Playlist;

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private router: Router,
              private playlistService: PlaylistService,
              private appStore: AppStateStore,
              private authService: AuthService
  ) {
    iconRegistry.addSvgIcon(
      'baseline-list',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/baseline-list-24px.svg'));
    iconRegistry.addSvgIcon(
      'phi',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/phi.svg'));

    this.appStore.state$
      .pipe(untilComponentDestroyed(this))
      .subscribe(res => {
        this.currentRoute = res['currentRoute'];
        this.activePlaylist = res['currentPlaylist'];
      });
  }

  navToPlaylist(){
    this.playlistService.fireNavigationToPlaylist();
  }

  ngOnDestroy():void {}

}
