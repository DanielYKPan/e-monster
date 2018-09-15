import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as bookActions from '../actions/book';
import * as fromBookRoot from '../reducers';
import * as collectionAction from '../actions/collection';
import { IBook } from '../../model';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnInit, OnDestroy {

    public book$: Observable<IBook>;
    public inCollection$: Observable<boolean>;
    private routeSub = Subscription.EMPTY;

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( private route: ActivatedRoute,
                 private appService: AppService,
                 private store: Store<fromBookRoot.State> ) {
    }

    public ngOnInit() {
        this.routeSub = this.route.params
            .pipe(map(params => new bookActions.Select({id: params.id})))
            .subscribe(action => this.store.dispatch(action));

        this.book$ = this.store.pipe(select(fromBookRoot.getSelectedBook));
        this.inCollection$ = this.store.pipe(select(fromBookRoot.isSelectedBookInCollection));
    }

    public ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    public addToCollection( book: IBook ) {
        this.store.dispatch(new collectionAction.AddBook({entity: book}));
    }

    public removeFromCollection( book: IBook ) {
        this.store.dispatch(new collectionAction.RemoveBook({entity: book}));
    }
}
