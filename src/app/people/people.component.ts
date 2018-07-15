import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../reducers';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent implements OnInit {

    public showLoader$: Observable<boolean>;

    constructor(private store: Store<fromRoot.State>) {
    }

    ngOnInit() {
        this.showLoader$ = this.store.pipe(select(fromRoot.getSearchPeopleTypeLoader));
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }

}
