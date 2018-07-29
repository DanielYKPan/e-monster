import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { IAudio } from '../../model';
import * as fromMoviesRoot from '../reducers';
import * as movieVideoActions from '../actions/video';
import { OwlDialogService } from 'owl-ng';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListComponent implements OnInit, AfterContentInit, OnDestroy {

    public list$: Observable<IAudio[]>; // Movie List Observable

    public featuredList$: Observable<IAudio[]>; // Featured Movie List Observable

    public listQuery$: Observable<string>; // list query

    public listPage$: Observable<number>; // list page

    public listTotalPages$: Observable<number>; // list total pages

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromMoviesRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromMoviesRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromMoviesRoot.getSearchFeaturedList));
        this.listQuery$ = this.store.pipe(select(fromMoviesRoot.getSearchQuery));
        this.listPage$ = this.store.pipe(select(fromMoviesRoot.getSearchPage));
        this.listTotalPages$ = this.store.pipe(select(fromMoviesRoot.getSearchTotalPage));
    }

    public ngAfterContentInit(): void {
        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromMoviesRoot.getSearchResults),
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
    public goToPage( event: any ): void {
        this.router.navigate(['movie/search', {query: event.query, page: event.page}]);
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
        this.router.navigate(['movie/search', {query: event.query}]);
    }

    /**
     * Open a trailer dialog for a specific movie
     * */
    public openMovieTrailerDialog( res: { audio: IAudio, event: any } ): void {
        // search the movie videos
        this.store.dispatch(new movieVideoActions.SearchVideos(res.audio.id));
        const movieVideo$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideo));
        const showLoader$ = this.store.pipe(select(fromMoviesRoot.getSearchVideoLoader));

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
