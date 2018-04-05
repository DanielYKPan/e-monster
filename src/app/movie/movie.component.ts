import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromMovieRoot from './reducers';
import * as SearchActions from './actions/movie';
import { Observable } from 'rxjs/Observable';
import { IMovie } from './movie.model';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

    public topRateds$: Observable<IMovie[]>;
    public upcomings$: Observable<IMovie[]>;

    constructor( private store: Store<fromMovieRoot.State> ) {
    }

    public ngOnInit() {
        this.store.dispatch(new SearchActions.SearchTopRatedList());
        this.store.dispatch(new SearchActions.SearchUpcomingList());

        this.topRateds$ = this.store.pipe(select(fromMovieRoot.getTopRatedMovies));
        this.upcomings$ = this.store.pipe(select(fromMovieRoot.getUpcomingMovies));
    }
}
