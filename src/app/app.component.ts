import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';

import * as fromCoreRoot from './core/reducers';

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

    public showLoader$: Observable<boolean>;

    constructor( private store: Store<fromCoreRoot.State>,
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

        this.showLoader$ = this.store.pipe(select(fromCoreRoot.getShowLoader));
    }

    public ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
    }

    public handleHamburgerClick( event: any ): void {
        console.log('hamburger click');
        event.preventDefault();
    }
}
