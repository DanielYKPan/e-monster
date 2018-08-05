import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Authenticate } from '../../model';
import * as fromAdmin from '../reducers';
import * as authActions from '../actions/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    public error$: Observable<string>;
    public pending$: Observable<boolean>;

    constructor( private store: Store<fromAdmin.State> ) {
    }

    public ngOnInit() {
        this.error$ = this.store.pipe(select(fromAdmin.getLoginError));
        this.pending$ = this.store.pipe(select(fromAdmin.getLoginPending));
    }

    public handleLoginFormSubmit( value: Authenticate ): void {
        this.store.dispatch(new authActions.Login(value));
    }
}
