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
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromBooksRoot from '../reducers';
import * as fromRoot from '../../reducers';
import { IBook } from '../../model';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild('frameMainElm') frameMainElmRef: ElementRef;

    public list$: Observable<IBook[]>;

    public listQuery$: Observable<string>;

    public listPage$: Observable<number>;

    public listTotalPages$: Observable<number>;

    public navList = [
        {name: 'Top Fictions', value: 'combined-print-and-e-book-fiction', inform: 'The Best Sold Fictions in NYTimes.com(New York Times)'},
    ];

    constructor( private store: Store<fromBooksRoot.State> ) {
    }

    private scrollBackTopSub = Subscription.EMPTY;

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromRoot.getSearchResults));
        this.listQuery$ = this.store.pipe(select(fromRoot.getSearchQuery));
        this.listPage$ = this.store.pipe(select(fromRoot.getSearchPage));
        this.listTotalPages$ = this.store.pipe(select(fromRoot.getSearchTotalPage));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromRoot.getSearchResults),
            skip(1)
        ).subscribe(() => {
            this.scrollBackToTop();
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    private scrollBackToTop(): void {
        this.frameMainElmRef.nativeElement.scroll({top: 0, behavior: 'smooth'});
    }
}
