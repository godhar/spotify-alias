import { PlaylistService } from './../../services/playlist/playlist.service';
import { PlaylistDataSource } from './../../services/playlist/playlist-data-source';
import { PlaylistItem } from './../../shared/playlist-item.model';
import { SpotifyDataService } from './../../spotifyData/spotify-data.service';
import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { tap } from 'rxjs/operators';
import { pipe, merge } from 'rxjs';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit, AfterViewInit, OnChanges {

  totalTracks = 9;//TODO get from parent component var tacks

  private id: string;
  private dataSource: PlaylistDataSource;
  displayedColumns = ['trackNum', 'trackName', 'pName', 'duration', 'artist'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private spotifyData: SpotifyDataService, private playlistService: PlaylistService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.dataSource = new PlaylistDataSource(this.playlistService);
    this.dataSource.loadPlaylist(this.id,'', 'asc', 0, 3);


    console.log('datasource', this.dataSource);
  }

  ngOnChanges() {
    console.log('data source ==== ', this.dataSource);
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPlaylistPage())
      ).subscribe();
  }

  loadPlaylistPage() {

    console.log('id', this.id)
    console.log('sort direction ', this.sort.direction)
    console.log('page index ', this.paginator.pageIndex)
    console.log('page size ', this.paginator.pageSize)
    this.dataSource.loadPlaylist(
      this.id, '', this.sort.direction,
      this.paginator.pageIndex, this.paginator.pageSize);
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
