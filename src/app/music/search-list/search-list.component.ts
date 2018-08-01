import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromMusicRoot from '../reducers';
import { IAlbum, ITrack } from '../../model';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit, AfterContentInit, OnDestroy {

    public albumList$: Observable<IAlbum[]>;
    public trackList$: Observable<ITrack[]>;

    public paginatorData$: Observable<{
        album_page: number,
        album_total_pages: number,
        album_query: string,
        track_page: number,
        track_total_pages: number,
        track_query: string,
    }>;

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private store: Store<fromMusicRoot.State>,
                 private router: Router ) {
    }

    public ngOnInit() {
        this.albumList$ = this.store.pipe(select(fromMusicRoot.getSearchAlbumResults));
        this.trackList$ = this.store.pipe(select(fromMusicRoot.getSearchTrackResults));
        this.paginatorData$ = this.store.pipe(select(fromMusicRoot.getPaginatorData));
    }

    public ngAfterContentInit(): void {
        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = combineLatest(this.albumList$, this.trackList$)
            .pipe(skip(1))
            .subscribe(() => {
                window.scroll({top: 0, behavior: 'smooth'});
            });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    public goToAlbumPage( event: any, track_page: number ): void {
        const queryParams = track_page ?
            {query: event.query, page_album: event.page, page_track: track_page} :
            {query: event.query, page_album: event.page};
        this.router.navigate(['music/search', queryParams]);
    }

    public goToTrackPage( event: any, album_page: number ): void {
        const queryParams = album_page ?
            {query: event.query, page_album: album_page, page_track: event.page} :
            {query: event.query, page_track: event.page};
        this.router.navigate(['music/search', queryParams]);
    }

    /**
     * Go a specific search page
     * */
    public handleNavListOptionClick( event: any ) {
        this.router.navigate([`${event.type}/search`, {query: event.query}]);
    }

    /**
     * Handle query value change
     * */
    public handleQueryInputValueChange( event: any ) {
        this.router.navigate(['music/search', {query: event.query}]);
    }

    /**
     * Handle select track action
     * */
    public handleSelectTrack( albumId: string, trackId: string ): void {
        this.router.navigate(['music/album', albumId], {queryParams: {track_id: trackId}});
    }

    /**
     * Handle select album action
     * */
    public handleSelectAlbum( albumId: string ) {
        this.router.navigate(['music/album', albumId]);
    }
}
