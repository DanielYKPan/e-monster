import { AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OwlDialogService } from 'owl-ng';

import { IAudio } from '../../model';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import * as fromTvRoot from '../reducers';
import * as videoActions from '../actions/video';

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
                 private store: Store<fromTvRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    public ngOnInit() {
        this.list$ = this.store.pipe(select(fromTvRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromTvRoot.getSearchFeaturedList));
        this.paginatorData$ = this.store.pipe(select(fromTvRoot.getPaginatorData));
    }

    public ngAfterContentInit(): void {

        // Whenever we have new search results,
        // we scroll back to the top of the page.
        this.scrollBackTopSub = this.store.pipe(
            select(fromTvRoot.getSearchResults),
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
        this.router.navigate(['tv/search', {query: event.query, page: event.page}]);
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
        this.router.navigate(['tv/search', {query: event.query}]);
    }

    public openTvTrailerDialog( res: { audio: IAudio; event: any } ): void {
        // search the tv video
        this.store.dispatch(new videoActions.SearchTvVideos(res.audio.id));
        const tvVideo$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideo));
        const showLoader$ = this.store.pipe(select(fromTvRoot.getSearchTvVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.name,
                video$: tvVideo$,
                showLoader$: showLoader$,
            },
            dialogClass: 'audio-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new videoActions.Select(null));
        });
    }
}
