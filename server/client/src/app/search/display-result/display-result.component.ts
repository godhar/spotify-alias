import {Component, Input, OnInit} from '@angular/core';
import {Album, Artist, Track} from "../../models/spotifyData.model";

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent {

  @Input() item: Track | Artist | Album;
  @Input() category: string;

  constructor() {
  }

}
