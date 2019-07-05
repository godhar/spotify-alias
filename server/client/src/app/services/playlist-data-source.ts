import { PlaylistItem } from './../shared/playlist-item.model';
import {map, catchError, finalize, tap} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PlaylistService } from './playlist.service';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";


export class PlaylistDataSource implements DataSource<PlaylistItem> {

    private playlistSubject = new BehaviorSubject<PlaylistItem[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();


    constructor(private playlistService: PlaylistService) { }


    connect(collectionViewer: CollectionViewer): Observable<PlaylistItem[]> {
        return this.playlistSubject.asObservable();
    }


    disconnect(collectionViewer: CollectionViewer): void {
        this.playlistSubject.complete();
        this.loadingSubject.complete();
    }


    loadPlaylist(playlistId: string, filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 3) {
        this.loadingSubject.next(true);

        this.playlistService.findPlaylistTracks(playlistId, filter, sortDirection,
            pageIndex, pageSize).pipe(

              tap(val => console.log('new val further', val)),
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(tracks => this.playlistSubject.next(tracks));
    }

}
