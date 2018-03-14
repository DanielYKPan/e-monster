import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../book.model';
import { select, Store } from '@ngrx/store';
import * as fromBooks from '../../reducers';
import * as CollectionActions from '../../actions/collection';

@Component({
    selector: 'app-view-collection',
    templateUrl: './view-collection.component.html',
    styleUrls: ['./view-collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class ViewCollectionComponent implements OnInit {

    public books$: Observable<Book[]>;

    constructor( private store: Store<fromBooks.State> ) {
    }

    ngOnInit() {
        this.store.dispatch(new CollectionActions.Load());

        this.books$ = this.store.pipe(select(fromBooks.getCollectionBooks));
    }
}
