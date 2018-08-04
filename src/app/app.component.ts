import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromCoreRoot from './core/reducers';
import * as layoutActions from './core/layout-store/actions';
import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild('appContainer') appContainerElmRef: ElementRef;

    private _isMobile = false;
    get isMobile(): boolean {
        return this._isMobile;
    }

    private breakpointSub = Subscription.EMPTY;

    public showLoader$: Observable<boolean>;
    public showSidenav$: Observable<boolean>;

    constructor( private store: Store<fromCoreRoot.State>,
                 private breakpointObserver: BreakpointObserver,
                 private appService: AppService ) {
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
        this.showSidenav$ = this.store.pipe(select(fromCoreRoot.getShowSidenav));
    }

    public ngAfterContentInit(): void {
        this.appService.registerAppContainer(this.appContainerElmRef.nativeElement);
    }

    public ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
    }

    public toggleSidenav(): void {
        this.store.dispatch(new layoutActions.ToggleSidenav());
    }

    public closeSidenav(): void {
        this.store.dispatch(new layoutActions.CloseSidenav());
    }
}
