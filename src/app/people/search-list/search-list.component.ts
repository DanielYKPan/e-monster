import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromPeopleRoot from '../reducers';
import { IActor } from '../../model';

@Component({
    selector: 'app-actor-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild('frameMainElm') frameMainElmRef: ElementRef;

    public list$: Observable<IActor[]>;

    public featuredList$: Observable<IActor[]>;

    public listQuery$: Observable<string>; // list query

    public listPage$: Observable<number>; // list page

    public listTotalPages$: Observable<number>; // list total pages

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromPeopleRoot.State> ) {
    }

    public ngOnInit() {
        this.list$ = this.store.pipe(select(fromPeopleRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromPeopleRoot.getSearchFeaturedList));
        this.listQuery$ = this.store.pipe(select(fromPeopleRoot.getSearchQuery));
        this.listPage$ = this.store.pipe(select(fromPeopleRoot.getSearchPage));
        this.listTotalPages$ = this.store.pipe(select(fromPeopleRoot.getSearchTotalPage));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromPeopleRoot.getSearchResults),
            skip(1)
        ).subscribe(() => {
            this.scrollBackToTop();
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    /**
     * Go a specific page of the list
     * */
    public goToPage( event: any ): void {
        this.router.navigate(['people/search', {query: event.query, page: event.page}]);
    }

    /**
     * Go a specific search page
     * */
    public handleNavListOptionClick( event: any ) {
        this.router.navigate([`${event.type}/search`, {query: event.query}]);
    }

    /**
     * Handle query value change
     * */
    public handleQueryInputValueChange( event: any ) {
        this.router.navigate(['people/search', {query: event.query}]);
    }

    private scrollBackToTop(): void {
        this.frameMainElmRef.nativeElement.scroll({top: 0, behavior: 'smooth'});
    }
}
