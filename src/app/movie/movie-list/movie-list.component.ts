import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OwlDialogService } from 'owl-ng';

import { IAudio } from '../../model';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import * as fromMovieRoot from '../reducers';
import * as movieVideoActions from '../actions/video';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, AfterContentInit, OnDestroy {

    public list$: Observable<IAudio[]>; // Movie List Observable

    public featuredList$: Observable<IAudio[]>; // Featured Movie List Observable

    public paginatorData$: Observable<{page: number, total_pages: number, query: string}>;

    public navList = [
        {name: 'Trending', value: 'now_playing', inform: 'The movies currently in theatres'},
        {name: 'Popular', value: 'popular', inform: 'The current popular movies'},
        {name: 'Upcoming', value: 'upcoming', inform: 'The upcoming movies in theatres'},
        {name: 'Anticipated', value: 'anticipated', inform: 'The most anticipated movies in the next couple years'},
        {name: 'Top Rated', value: 'top_rated', inform: 'The top rated movies'},
    ];

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromMovieRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromMovieRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromMovieRoot.getSearchFeaturedList));
        this.paginatorData$ = this.store.pipe(select(fromMovieRoot.getPaginatorData));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromMovieRoot.getSearchResults),
            skip(1)
        ).subscribe(() => {
            window.scroll({top: 0, behavior: 'smooth'});
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    public handleNavListOptionClick( option: string ) {
        this.router.navigate(['movie/list', option]);
    }

    /**
     * Go a specific page of the list
     * */
    public goToPage( page: number, query: string ): void {
        this.router.navigate(['movie/list', query, {page}]);
    }

    /**
     * Open a trailer dialog for a specific movie
     * */
    public openMovieTrailerDialog( res: { audio: IAudio, event: any } ): void {
        // search the movie videos
        this.store.dispatch(new movieVideoActions.SearchVideos(res.audio.id));
        const movieVideo$ = this.store.pipe(select(fromMovieRoot.getSelectedMovieVideo));
        const showLoader$ = this.store.pipe(select(fromMovieRoot.getSearchVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.title,
                video$: movieVideo$,
                showLoader$: showLoader$,
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new movieVideoActions.Select(null));
        });
    }
}
