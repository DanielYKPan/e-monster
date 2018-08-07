import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromMovieRoot from '../reducers';
import * as searchActions from '../actions/search';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-movie-home',
    templateUrl: './movie-home.component.html',
    styleUrls: ['./movie-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieHomeComponent implements OnInit, AfterViewInit, OnDestroy {

    public backdrop$: Observable<string>;

    private timerSub = Subscription.EMPTY;

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( private store: Store<fromMovieRoot.State>,
                 private appService: AppService ) {
    }

    public ngOnInit() {
        this.backdrop$ = this.store.pipe(select(fromMovieRoot.getRandomMovieBackdrop));
    }

    public ngAfterViewInit(): void {
        this.timerSub = timer(5000, 5000).subscribe(() => {
            this.store.dispatch(new searchActions.GenerateIndex());
        });
    }

    public ngOnDestroy(): void {
        this.timerSub.unsubscribe();
    }

}
