import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album, Artist, Track} from "../../models/spotifyData.model";

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent {

  @Input() item: Track | Artist | Album;
  @Input() category: string;
  @Output() showTracksSelected = new EventEmitter<Artist|Album>();

  constructor() {
  }

  getTracks(item: Album|Artist) {
    console.log('do I have an item here', item)
    this.showTracksSelected.emit(item);
  }
}
