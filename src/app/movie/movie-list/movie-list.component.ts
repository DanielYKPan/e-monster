import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IMovie, ISearchStat } from '../movie.model';
import { select, Store } from '@ngrx/store';
import * as fromMovieRoot from '../reducers';
import * as movieActions from '../actions/movie';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnDestroy {

    public list$: Observable<IMovie[]>;

    public featuredList$: Observable<IMovie[]>;

    public searchStat$: Observable<ISearchStat>;

    public query$: Observable<string>;

    private _isLargeUp = false;
    get isLargeUp(): boolean {
        return this._isLargeUp;
    }

    private breakpointSub = Subscription.EMPTY;

    constructor( private store: Store<fromMovieRoot.State>,
                 private breakpointObserver: BreakpointObserver,
                 private cdRef: ChangeDetectorRef ) {
    }

    ngOnInit() {

        this.list$ = this.store.pipe(select(fromMovieRoot.getSearchNonFeaturedMovieList));
        this.featuredList$ = this.store.pipe(select(fromMovieRoot.getSearchFeaturedMovieList));
        this.searchStat$ = this.store.pipe(select(fromMovieRoot.getSearchStat));
        this.query$ = this.store.pipe(select(fromMovieRoot.getSearchQuery));

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
        this.store.dispatch(new movieActions.SearchList({query: event.query, page: event.page}));
    }
}
