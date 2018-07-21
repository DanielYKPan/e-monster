import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as bookActions from '../actions/book';
import * as fromBookRoot from '../reducers';
import { IBook } from '../../model';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit, OnDestroy {

    public book$: Observable<IBook>;

    private routeSub = Subscription.EMPTY;

    constructor( private route: ActivatedRoute,
                 private store: Store<fromBookRoot.State> ) {
    }

    public ngOnInit() {
        this.routeSub = this.route.params
            .pipe(map(params => new bookActions.Select(params.id)))
            .subscribe(action => this.store.dispatch(action));

        this.book$ = this.store.pipe(select(fromBookRoot.getSelectedBook));
    }

    public ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
