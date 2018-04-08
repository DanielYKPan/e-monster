import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';

import * as fromRoot from './reducers';
import * as fromLayout from './layout/actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    private _isMobile = false;
    get isMobile(): boolean {
        return this._isMobile;
    }

    private breakpointSub = Subscription.EMPTY;

    public showSidenav$: Observable<boolean>;

    public showLoader$: Observable<boolean>;
    public showLoader = false;

    constructor( private store: Store<fromRoot.State>,
                 private breakpointObserver: BreakpointObserver ) {
    }

    public ngOnInit(): void {
        this.breakpointSub = this.breakpointObserver
            .observe([
                Breakpoints.Tablet,
                Breakpoints.Web,
            ]).subscribe(result => {
                this._isMobile = !result.matches;
            });

        this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));

        // this.showLoader$ = this.store.pipe(select(fromRoot.getShowLoader));
    }

    public ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
    }

    public closeSidenav(): void {
        this.store.dispatch(new fromLayout.CloseSidenav);
    }

    public openSidenav(): void {
        this.store.dispatch(new fromLayout.OpenSidenav);
    }

    public toggleSidenav(): void {
        this.store.dispatch(new fromLayout.ToggleSidenav);
    }
}
