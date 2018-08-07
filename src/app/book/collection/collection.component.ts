import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../../model';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromBookRoot from '../reducers';

@Component({
    selector: 'app-book-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {

    public list$: Observable<IBook[]>;

    public navList = [
        {
            name: 'Top Fictions',
            value: 'combined-print-and-e-book-fiction',
            inform: 'The Best Sold Fictions in NYTimes.com(New York Times)'
        },
        {name: 'My Collection', value: 'collection', inform: 'My movie collection'},
    ];

    constructor( private router: Router,
                 private store: Store<fromBookRoot.State> ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromBookRoot.getBookCollection));
    }

    public handleNavListOptionClick( option: string ) {
        option === 'collection' ?
            this.router.navigate(['book/collection']) :
            this.router.navigate(['book/list', option]);
    }
}
