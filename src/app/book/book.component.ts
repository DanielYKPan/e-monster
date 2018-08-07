import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppService } from '../app.service';
import * as fromBookRoot from './reducers';
import * as collectionAction from './actions/collection';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

    constructor( private appService: AppService,
                 private store: Store<fromBookRoot.State> ) {
    }

    ngOnInit() {
        this.store.dispatch(new collectionAction.Load());
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
