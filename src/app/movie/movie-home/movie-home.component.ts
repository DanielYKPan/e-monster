import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromMovieRoot from '../reducers';
import * as fromRoot from '../../reducers';
import { select, Store } from '@ngrx/store';

@Component({
    selector: 'app-movie-home',
    templateUrl: './movie-home.component.html',
    styleUrls: ['./movie-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieHomeComponent implements OnInit {

    public backdrop$: Observable<string>;

    constructor( private store: Store<fromMovieRoot.State> ) {
    }

    public ngOnInit() {
        this.backdrop$ = this.store.pipe(select(fromRoot.getRandomMovieBackdrop));
    }

}
