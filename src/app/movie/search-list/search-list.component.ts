import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OwlDialogService } from 'owl-ng';

import { IAudio } from '../../model';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import * as fromMovieRoot from '../reducers';
import * as movieVideoActions from '../actions/video';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit, AfterContentInit, OnDestroy {

    public list$: Observable<IAudio[]>; // Movie List Observable

    public featuredList$: Observable<IAudio[]>; // Featured Movie List Observable

    public paginatorData$: Observable<{page: number, total_pages: number, query: string}>;

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromMovieRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromMovieRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromMovieRoot.getSearchFeaturedList));
        this.paginatorData$ = this.store.pipe(select(fromMovieRoot.getPaginatorData));
    }

    public ngAfterContentInit(): void {
        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromMovieRoot.getSearchResults),
            skip(1)
        ).subscribe(() => {
            window.scroll({top: 0, behavior: 'smooth'});
        });
    }

    public ngOnDestroy(): void {
        this.scrollBackTopSub.unsubscribe();
    }

    /**
     * Go a specific page of the list
     * */
    public goToPage( page: number, query: string ): void {
        this.router.navigate(['movie/search', {query, page}]);
    }

    /**
     * Go a specific search page
     * */
    public handleNavListOptionClick( option: string, query: string ) {
        this.router.navigate([`${option}/search`, {query}]);
    }

    /**
     * Handle query value change
     * */
    public handleQueryInputValueChange( event: any ) {
        this.router.navigate(['movie/search', {query: event.query}]);
    }

    /**
     * Open a trailer dialog for a specific movie
     * */
    public openMovieTrailerDialog( res: { audio: IAudio, event: any } ): void {
        // search the movie videos
        this.store.dispatch(new movieVideoActions.SearchVideos(res.audio.id));
        const movieVideo$ = this.store.pipe(select(fromMovieRoot.getSelectedMovieVideo));
        const showLoader$ = this.store.pipe(select(fromMovieRoot.getSearchVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.title,
                video$: movieVideo$,
                showLoader$: showLoader$,
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new movieVideoActions.Select(null));
        });
    }
}
