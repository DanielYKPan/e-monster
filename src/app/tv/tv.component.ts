import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from './reducers';
import * as fromRoot from '../reducers';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvComponent implements OnInit {

    public showLoader$: Observable<boolean>;

    constructor( private store: Store<fromTvRoot.State> ) {
    }

    ngOnInit() {
        this.showLoader$ = this.store.pipe(select(fromRoot.getSearchTvTypeLoader));
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }
}
