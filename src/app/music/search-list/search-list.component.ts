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
    public albumListPage$: Observable<number>;
    public albumListTotalPages$: Observable<number>;

    public trackList$: Observable<ITrack[]>;
    public trackListPage$: Observable<number>;
    public trackListTotalPages$: Observable<number>;

    public listQuery: string; // list query

    private scrollBackTopSub = Subscription.EMPTY;
    private listQuerySub = Subscription.EMPTY;

    constructor( private store: Store<fromMusicRoot.State>,
                 private router: Router ) {
    }

    public ngOnInit() {
        this.listQuerySub = this.store
            .pipe(select(fromMusicRoot.getSearchAlbumQuery))
            .subscribe(( q ) => {
                this.listQuery = q;
            });

        this.albumList$ = this.store.pipe(select(fromMusicRoot.getSearchAlbumResults));
        this.albumListPage$ = this.store.pipe(select(fromMusicRoot.getSearchAlbumPage));
        this.albumListTotalPages$ = this.store.pipe(select(fromMusicRoot.getSearchAlbumTotalPage));

        this.trackList$ = this.store.pipe(select(fromMusicRoot.getSearchTrackResults));
        this.trackListPage$ = this.store.pipe(select(fromMusicRoot.getSearchTrackPage));
        this.trackListTotalPages$ = this.store.pipe(select(fromMusicRoot.getSearchTrackTotalPage));
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
        this.listQuerySub.unsubscribe();
    }

    public goToAlbumPage( e: any, trackPage: number ): void {
        this.router.navigate(['music/search', {query: e.query, page_album: e.page, page_track: trackPage}]);
    }

    public goToTrackPage( e: any, albumPage: number ): void {
        this.router.navigate(['music/search', {query: e.query, page_album: albumPage, page_track: e.page}]);
    }

    public getArtistNameList( artists: any[] ): string[] {
        return artists.map(( artist ) => artist.name);
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
}
