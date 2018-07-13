import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as fromRoot from '../../reducers';
import * as movieVideoActions from '../actions/video';
import { OwlDialogService } from 'owl-ng';
import { IAudio } from '../../model';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnDestroy {

    public list$: Observable<IAudio[]>; // Movie List Observable

    public featuredList$: Observable<IAudio[]>; // Featured Movie List Observable

    public listName$: Observable<string>; // list query

    public listPage$: Observable<number>; // list page

    public listTotalPages$: Observable<number>; // list total pages

    public navList = [
        {name: 'Trending', value: 'now_playing', inform: 'The movies currently in theatres'},
        {name: 'Popular', value: 'popular', inform: 'The current popular movies'},
        {name: 'Upcoming', value: 'upcoming', inform: 'The upcoming movies in theatres'},
        {name: 'Anticipated', value: 'anticipated', inform: 'The most anticipated movies in the next couple years'},
        {name: 'Top Rated', value: 'top_rated', inform: 'The top rated movies'},
    ];

    constructor( private router: Router,
                 private store: Store<fromMoviesRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromRoot.getSearchFeaturedList));
        this.listName$ = this.store.pipe(select(fromRoot.getSearchName));
        this.listPage$ = this.store.pipe(select(fromRoot.getSearchPage));
        this.listTotalPages$ = this.store.pipe(select(fromRoot.getSearchTotalPage));
    }

    public ngOnDestroy(): void {
    }

    public handleNavListOptionClick( option: string ) {
        this.router.navigate(['movies/list', option]);
    }

    /**
     * Go a specific page of the list
     * */
    public goToPage( event: any ): void {
        this.router.navigate(['movies/list', event.name, {page: event.page}]);
    }

    /**
     * Open a trailer dialog for a specific movie
     * */
    public openMovieTrailerDialog( res: { audio: IAudio, event: any } ): void {
        // search the movie videos
        this.store.dispatch(new movieVideoActions.SearchVideos(res.audio.id));
        const movieVideo$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideo));
        const showLoader$ = this.store.pipe(select(fromRoot.getSearchVideoTypeLoader));

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
