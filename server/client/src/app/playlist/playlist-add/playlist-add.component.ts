import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Album, Artist, Track, TrackFull} from "../../models/spotifyData.model";
import {Observable} from "rxjs";
import {SearchService} from "../../search/search.service";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.scss']
})
export class PlaylistAddComponent implements OnInit {

  private playlistId: string;
  private sEntity: Album | Artist | Track;
  private tracksEntity: Album | Artist;

  constructor(private route: ActivatedRoute, private search: SearchService) {
    this.playlistId = this.route.snapshot.params.id;
  }

  ngOnInit() {
  }

  handleEntity(entity: Album|Artist|Track) {
    this.sEntity = entity;
  }

  getTracks(entity: Album|Artist) {
    console.log('passed it down here ',entity)
    this.tracksEntity = entity;
  }
}



