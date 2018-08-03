import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import * as fromPeopleRoot from '../reducers';
import { IActor, IArtist } from '../../model';
import { AppService } from '../../app.service';

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
                 private appService: AppService,
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
                this.appService.scrollBackToTop(true);
            });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    public goToActorPage( page_actor: number, page_artist: number, query: string ): void {
        const queryParams = page_artist ?
            {query, page_actor, page_artist} :
            {query, page_actor};
        this.router.navigate(['people/search', queryParams]);
    }

    public goToArtistPage( page_artist: number, page_actor: number, query: string ): void {
        const queryParams = page_actor ?
            {query, page_actor: page_actor, page_artist} :
            {query, page_actor};
        this.router.navigate(['people/search', queryParams]);
    }

    /**
     * Go a specific search page
     * */
    public handleNavListOptionClick( option: string, query) {
        this.router.navigate([`${option}/search`, {query}]);
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
