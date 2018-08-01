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
    public artistList$: Observable<IArtist[]>;

    public paginatorData$: Observable<{
        actor_page: number,
        actor_total_pages: number,
        actor_query: string,
        artist_page: number,
        artist_total_pages: number,
        artist_query: string,
    }>;

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromPeopleRoot.State> ) {
    }

    public ngOnInit() {
        this.actorList$ = this.store.pipe(select(fromPeopleRoot.getSearchActorResults));
        this.artistList$ = this.store.pipe(select(fromPeopleRoot.getSearchArtistResults));
        this.paginatorData$ = this.store.pipe(select(fromPeopleRoot.getPaginatorData));
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
    }

    public goToActorPage( event: any, artist_page: number ): void {
        const queryParams = artist_page ?
            {query: event.query, page_actor: event.page, page_artist: artist_page} :
            {query: event.query, page_actor: event.page};
        this.router.navigate(['people/search', queryParams]);
    }

    public goToArtistPage( event: any, actor_page: number ): void {
        const queryParams = actor_page ?
            {query: event.query, page_actor: actor_page, page_artist: event.page} :
            {query: event.query, page_actor: event.page};
        this.router.navigate(['people/search', queryParams]);
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
