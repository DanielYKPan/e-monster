import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../model';
import * as fromUser from '../reducers';
import * as authActions from '../actions/auth';

@Component({
    selector: 'app-my-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {

    public user$: Observable<User>;

    constructor( private store: Store<fromUser.State> ) {
    }

    public ngOnInit() {
        this.user$ = this.store.pipe(select(fromUser.getLoggedInUser));
    }

    public handleClickOnLogout( event: any ): void {
        this.store.dispatch(new authActions.Logout());
        event.preventDefault();
    }
}
