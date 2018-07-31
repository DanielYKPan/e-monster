import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromPeopleRoot from '../reducers';
import { IActor, IArtist } from '../../model';

@Component({
    selector: 'app-actor-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit, AfterContentInit, OnDestroy {

    public actorList$: Observable<IActor[]>;
    public actorListPage$: Observable<number>; // list page
    public actorListTotalPages$: Observable<number>; // list total pages

    public artistList$: Observable<IArtist[]>;
    public artistListPage$: Observable<number>; // list page
    public artistListTotalPages$: Observable<number>; // list total pages

    public listQuery$: Observable<string>; // list query
    public listQuery: string; // list query

    private scrollBackTopSub = Subscription.EMPTY;
    private listQuerySub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromPeopleRoot.State> ) {
    }

    public ngOnInit() {
        this.listQuerySub = this.store
            .pipe(select(fromPeopleRoot.getSearchActorQuery))
            .subscribe(( q ) => {
                this.listQuery = q;
            });

        this.actorList$ = this.store.pipe(select(fromPeopleRoot.getSearchActorResults));
        this.actorListPage$ = this.store.pipe(select(fromPeopleRoot.getSearchActorPage));
        this.actorListTotalPages$ = this.store.pipe(select(fromPeopleRoot.getSearchActorTotalPage));

        this.artistList$ = this.store.pipe(select(fromPeopleRoot.getSearchArtistResults));
        this.artistListPage$ = this.store.pipe(select(fromPeopleRoot.getSearchArtistPage));
        this.artistListTotalPages$ = this.store.pipe(select(fromPeopleRoot.getSearchArtistTotalPage));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = combineLatest(this.actorList$, this.artistList$)
            .pipe(skip(1))
            .subscribe(() => {
                window.scroll({top: 0, behavior: 'smooth'});
            });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
        this.listQuerySub.unsubscribe();
    }

    public goToActorPage( event: any, artistPage: any ): void {
        console.log(artistPage);
        // this.router.navigate(['people/search', {query: event.query, page_actor: event.page, page_artist: artistPage}]);
    }

    public goToArtistPage( event: any, actorPage: any ): void {
        console.log(actorPage);
        // this.router.navigate(['people/search', {query: event.query, page_actor: actorPage, page_artist: event.page}]);
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

    /**
     * Handle select actor action
     * */
    public handleSelectActor( id: number ): void {
        this.router.navigate(['people/actor', id]);
    }

    /**
     * Handle select artist action
     * */
    public handleSelectArtist( id: number ): void {
        this.router.navigate(['people/artist', id]);
    }
}
