import { PlaylistItem } from '../../models/playlist-item.model';
import {catchError, finalize} from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PlaylistService } from '../../core/services/playlist.service';
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


    loadPlaylist(playlistId: string, filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 6) {
        this.loadingSubject.next(true);

        this.playlistService.findPlaylistTracks(playlistId, filter, sortDirection,
            pageIndex, pageSize).pipe(
              catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(tracks => this.playlistSubject.next(tracks));
    }

}
