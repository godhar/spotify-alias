import {Component, Input, OnInit} from '@angular/core';
import {Album, Artist, TrackFull} from "../../models/spotifyData.model";
import {SearchService} from "../search.service";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {MatDialogConfig, MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {PlaylistService} from "../../services/playlist.service";
import {PopUpComponent} from "../../pop-up/pop-up.component";


@Component({
  selector: 'app-display-track',
  templateUrl: './display-tracks.component.html',
  styleUrls: ['./display-tracks.component.scss']
})
export class DisplayTracksComponent {

  dataSource: TrackFull[];
  private playlistDetail;
  displayedColumns = ["name", "album", "artist", "duration", "externalSource"];

  constructor(private router: Router,
              private searchService: SearchService,
              private route: ActivatedRoute,
              private playlistService: PlaylistService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    this.route.data.subscribe(
      res => {
        this.dataSource = res.trackData
      }
    );
    this.playlistDetail = this.playlistService.getCurrentEntity();

    iconRegistry.addSvgIcon(
      'baseline-arrow-back',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/baseline-arrow_back_ios-24px.svg'));
  }

  navigateToSearch() {
    this.router.navigate(['playlist-add', this.playlistDetail.currentPlayListId]);
  }


  onSelect(row) {
    console.log(row)
  }

  openPopUp(msg: string) {
    // const dialogConfig = new MatDialogConfig();
    //
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    //
    // dialogConfig.data = {
    //   title: 'Add to Playlist ' + this.playlistDetail.name,
    //   content: msg + ' has been deleted from ' + this.playlistName
    // };
    //
    // this.dialog.open(PopUpComponent, dialogConfig);
  }

}
