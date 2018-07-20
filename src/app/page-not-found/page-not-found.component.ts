import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../reducers';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent implements OnInit {

    public showLoader$: Observable<boolean>;

    constructor( private store: Store<fromRoot.State> ) {
    }

    ngOnInit() {
        this.showLoader$ = this.store.pipe(select(fromRoot.getSearchLoading));
    }

}
