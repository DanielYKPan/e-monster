import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromMovieRoot from '../reducers';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-movie-home',
    templateUrl: './movie-home.component.html',
    styleUrls: ['./movie-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieHomeComponent implements OnInit {

    public backdrop$: Observable<string>;

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( private store: Store<fromMovieRoot.State>,
                 private appService: AppService ) {
    }

    public ngOnInit() {
        this.backdrop$ = this.store.pipe(select(fromMovieRoot.getRandomMovieBackdrop));
    }

}
