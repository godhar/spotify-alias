import {Component, Input, OnInit} from '@angular/core';
import {Album, Artist, TrackFull} from "../../models/spotifyData.model";
import {SearchService} from "../search.service";
import {FullTrackDataSource} from "./display-tracks/full-track-data-source";

@Component({
  selector: 'app-display-track',
  templateUrl: './display-tracks.component.html',
  styleUrls: ['./display-tracks.component.scss']
})
export class DisplayTracksComponent implements OnInit{

  @Input() entity: Album|Artist;
  dataSource: FullTrackDataSource;

  displayedColumns = ["name", "album", "artist", "duration", "externalSource"];

  constructor(private searchService: SearchService) {
  }

  ngOnInit( ) {

    console.log('what does entity look like ', this.entity)
    this.dataSource = new FullTrackDataSource(this.searchService, this.entity);
  }

}
