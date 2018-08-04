import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromCoreRoot from './core/reducers';
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

    public opened: boolean;

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
    }

    public ngAfterContentInit(): void {
        this.appService.registerAppContainer(this.appContainerElmRef.nativeElement);
    }

    public ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
    }

    public handleHamburgerClick( event: any ): void {
        this.opened = !this.opened;
        event.preventDefault();
    }

    public closeSidenav() {
        this.opened = false;
    }
}
