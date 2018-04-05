/**
 * find-book.component
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as SearchActions from '../../actions/book';
import { Book } from '../../book.model';

@Component({
    moduleId: module.id,
    selector: 'app-book',
    templateUrl: './find-book.component.html',
    styleUrls: ['./find-book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})

export class FindBookComponent implements OnInit {

    public query$: Observable<string>;

    public error$: Observable<string>;

    public loading$: Observable<boolean>;

    public books$: Observable<Book[]>;

    constructor( private store: Store<fromRoot.State> ) {
    }

    public ngOnInit() {

        this.query$ = this.store.pipe(select(fromRoot.getSearchQuery));

        this.error$ = this.store.pipe(select(fromRoot.getSearchError));

        this.loading$ = this.store.pipe(select(fromRoot.getSearchLoading));

        this.books$ = this.store.pipe(select(fromRoot.getSearchResults));
    }

    public search( query ): void {
        this.store.dispatch(new SearchActions.Search(query));
    }
}
