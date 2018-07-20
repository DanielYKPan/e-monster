import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromBookRoot from './reducers';
import * as fromRoot from '../reducers';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

    public showLoader$: Observable<boolean>;

    constructor( private store: Store<fromBookRoot.State> ) {
    }

    ngOnInit() {
        this.showLoader$ = this.store.pipe(select(fromRoot.getSearchBookTypeLoader));
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }
}
