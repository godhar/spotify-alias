import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Album, Artist, Track} from "../../models/spotifyData.model";
import {SearchService} from "../../search/search.service";
import {PlaylistService} from "../../services/playlist.service";
import {LoaderService} from "./loader.service";

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.scss']
})
export class PlaylistAddComponent {

  readonly playlistId: string;
  private sEntity: Album | Artist | Track = null;


  constructor(private loadingService: LoaderService,
              private route: ActivatedRoute,
              private search: SearchService,
              private router: Router,
              private playlistService: PlaylistService) {
    this.playlistId = this.route.snapshot.params.id;
  }

  handleEntity(entity: Album | Artist | Track) {
    this.sEntity = entity;
  }

  getTracks(entity: Album|Artist): void {
    this.playlistService.setCurrentEntity(entity);//set entity here
    this.router.navigate(['display-tracks', entity.type, entity.id]);
  }
}



