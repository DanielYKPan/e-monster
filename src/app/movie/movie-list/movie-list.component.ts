import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ISearchStat } from '../movie.model';
import { select, Store } from '@ngrx/store';
import * as fromMovieRoot from '../reducers';
import * as movieActions from '../actions/movie';
import * as movieVideoActions from '../actions/video';
import { OwlDialogService } from 'owl-ng';
import { MovieTrailerDialogComponent } from '../movie-trailer-dialog/movie-trailer-dialog.component';
import { IAudio } from '../../model/audio';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnDestroy {

    public list$: Observable<IAudio[]>;

    public featuredList$: Observable<IAudio[]>;

    public searchStat$: Observable<ISearchStat>;

    public searchType$: Observable<string>;

    private _isLargeUp = false;
    get isLargeUp(): boolean {
        return this._isLargeUp;
    }

    private breakpointSub = Subscription.EMPTY;

    constructor( private store: Store<fromMovieRoot.State>,
                 private dialogService: OwlDialogService,
                 private breakpointObserver: BreakpointObserver,
                 private cdRef: ChangeDetectorRef ) {
    }

    ngOnInit() {

        this.list$ = this.store.pipe(select(fromMovieRoot.getSearchNonFeaturedMovieList));
        this.featuredList$ = this.store.pipe(select(fromMovieRoot.getSearchFeaturedMovieList));
        this.searchStat$ = this.store.pipe(select(fromMovieRoot.getSearchStat));
        this.searchType$ = this.store.pipe(select(fromMovieRoot.getSearchType));

        this.breakpointSub = this.breakpointObserver
            .observe([
                '(min-width: 1024px)'
            ]).subscribe(result => {
                this._isLargeUp = result.matches;
                this.cdRef.markForCheck();
            });
    }

    public ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
    }

    public goToPage( event: any ): void {
        this.store.dispatch(new movieActions.SearchList({type: event.type, page: event.page}));
    }

    public openMovieTrailerDialog( res: { audio: IAudio, event: any } ): void {
        const dialogRef = this.dialogService.open(MovieTrailerDialogComponent, {
            data: {movieId: res.audio.id, movieTitle: res.audio.title}, // data that would pass to dialog component
            dialogClass: 'movie-trailer-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new movieVideoActions.Select(null));
        });
    }
}
