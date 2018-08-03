import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromMusicRoot from '../reducers';
import { IAlbum, ITrack } from '../../model';
import { AppService } from '../../app.service';

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
                 private appService: AppService,
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
                this.appService.scrollBackToTop(true);
            });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    public goToAlbumPage( page_album: number, page_track: number, query: string ): void {
        const queryParams = page_track ?
            {query, page_album, page_track} :
            {query, page_album};
        this.router.navigate(['music/search', queryParams]);
    }

    public goToTrackPage( page_track: number, page_album: number, query: string ): void {
        const queryParams = page_album ?
            {query, page_album: page_album, page_track} :
            {query, page_track};
        this.router.navigate(['music/search', queryParams]);
    }

    /**
     * Go a specific search page
     * */
    public handleNavListOptionClick( option: string, query: string ) {
        this.router.navigate([`${option}/search`, {query}]);
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
