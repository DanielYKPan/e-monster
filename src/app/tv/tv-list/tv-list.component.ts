import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OwlDialogService } from 'owl-ng';

import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import { IAudio } from '../../model';
import * as fromTvRoot from '../reducers';
import * as videoActions from '../actions/video';

@Component({
    selector: 'app-tv-list',
    templateUrl: './tv-list.component.html',
    styleUrls: ['./tv-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvListComponent implements OnInit, AfterContentInit, OnDestroy {

    public list$: Observable<IAudio[]>;

    public featuredList$: Observable<IAudio[]>;

    public paginatorData$: Observable<{page: number, total_pages: number, query: string}>;

    public navList = [
        {name: 'Trending', value: 'on_the_air', inform: 'The TV series currently on the air'},
        {name: 'Popular', value: 'popular', inform: 'The current popular TV series'},
        {name: 'Airing Today', value: 'airing_today', inform: 'TV shows that are airing today'},
        {name: 'Anticipated', value: 'anticipated', inform: 'The most anticipated TV series in the next couple years'},
        {name: 'Top Rated', value: 'top_rated', inform: 'The top rated TV series'},
    ];

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromTvRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    public ngOnInit() {
        this.list$ = this.store.pipe(select(fromTvRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromTvRoot.getSearchFeaturedList));
        this.paginatorData$ = this.store.pipe(select(fromTvRoot.getPaginatorData));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromTvRoot.getSearchResults),
            skip(1)
        ).subscribe(() => {
            window.scroll({top: 0, behavior: 'smooth'});
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    public handleNavListOptionClick( option: string ) {
        this.router.navigate(['tv/list', option]);
    }

    public goToPage( page: number, query: string ): void {
        this.router.navigate(['tv/list', query, {page}]);
    }

    public openTvTrailerDialog( res: { audio: IAudio; event: any } ): void {
        // search the tv video
        this.store.dispatch(new videoActions.SearchTvVideos(res.audio.id));
        const tvVideo$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideo));
        const showLoader$ = this.store.pipe(select(fromTvRoot.getSearchTvVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.name,
                video$: tvVideo$,
                showLoader$: showLoader$,
            },
            dialogClass: 'audio-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new videoActions.Select(null));
        });
    }
}
