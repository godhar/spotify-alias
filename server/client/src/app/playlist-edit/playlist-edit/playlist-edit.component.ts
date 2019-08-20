import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-playlist-edit',
  templateUrl: './playlist-edit.component.html',
  styleUrls: ['./playlist-edit.component.scss']
})
export class PlaylistEditComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('round-play', sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/round-play_circle.svg'))
      .addSvgIcon(
        'baseline-arrow-back',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/baseline-arrow_back_ios-24px.svg'));
  }

  ngOnInit() {
  }

}
