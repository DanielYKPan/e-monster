import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs/Subscription';

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

    constructor( private breakpointObserver: BreakpointObserver ) {
    }

    public ngOnInit(): void {
        this.breakpointSub = this.breakpointObserver
            .observe([
                Breakpoints.Tablet,
                Breakpoints.Web,
            ]).subscribe(result => {
                this._isMobile = !result.matches;
            });
    }

    public ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
    }
}
