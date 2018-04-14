import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromMovieRoot from './reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

    // public backdrop$: Observable<string>;

    public showLoader$: Observable<boolean>;

    constructor( private store: Store<fromMovieRoot.State> ) {
    }

    public ngOnInit() {
        // this.store.dispatch(new SearchActions.SearchList({type: 'now_playing', page: 1}));

        // this.backdrop$ = this.store.pipe(select(fromMovieRoot.getRandomMovieBackdrop));

        this.showLoader$ = this.store.pipe(select(fromMovieRoot.getSearchLoading));
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }
}
