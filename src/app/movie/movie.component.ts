import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromMovieRoot from './reducers';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

    public showLoader$: Observable<boolean>;

    constructor( private store: Store<fromMovieRoot.State> ) {
    }

    public ngOnInit() {
        this.showLoader$ = this.store.pipe(select(fromRoot.getSearchLoading));
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }
}
