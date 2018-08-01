import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromMusicRoot from '../reducers';
import { IAlbum } from '../../model';

@Component({
    selector: 'app-music-list',
    templateUrl: './music-list.component.html',
    styleUrls: ['./music-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicListComponent implements OnInit, AfterContentInit, OnDestroy {

    public list$: Observable<IAlbum[]>;

    public featuredList$: Observable<IAlbum[]>;

    public paginatorData$: Observable<{album_page: number, album_total_pages: number, album_query: string}>;

    private scrollBackTopSub = Subscription.EMPTY;

    public navList = [
        {name: 'New Releases', value: 'new-releases', inform: 'New album releases featured in Spotify'},
        {name: 'Hipster', value: 'tag:hipster', inform: 'Albums with high popularity in Spotify'},
    ];

    constructor( private store: Store<fromMusicRoot.State>,
                 private router: Router ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromMusicRoot.getSearchAlbumNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromMusicRoot.getSearchAlbumFeaturedList));
        this.paginatorData$ = this.store.pipe(select(fromMusicRoot.getPaginatorData));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromMusicRoot.getSearchAlbumResults),
            skip(1)
        ).subscribe(() => {
            window.scroll({top: 0, behavior: 'smooth'});
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    public handleNavListOptionClick( option: string ) {
        this.router.navigate(['music/list', option]);
    }

    /**
     * Go a specific page of the list
     * */
    public goToPage( page: number, query: string ): void {
        this.router.navigate(['music/list', query, {page}]);
    }

    /**
     * Handle select album action
     * */
    public handleSelectAlbum( albumId: string ) {
        this.router.navigate(['music/album', albumId]);
    }
}
