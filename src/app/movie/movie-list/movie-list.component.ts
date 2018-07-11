import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as fromRoot from '../../reducers';
import * as searchActions from '../../search/actions';
import * as movieVideoActions from '../actions/video';
import { OwlDialogService } from 'owl-ng';
import { IAudio } from '../../model';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnDestroy {

    public list$: Observable<IAudio[]>;

    public featuredList$: Observable<IAudio[]>;

    public listQuery$: Observable<string>;

    public listPage$: Observable<number>;

    public listTotalPages$: Observable<number>;

    private _isLargeUp = false;
    get isLargeUp(): boolean {
        return this._isLargeUp;
    }

    private breakpointSub = Subscription.EMPTY;

    constructor( private store: Store<fromMoviesRoot.State>,
                 private dialogService: OwlDialogService,
                 private breakpointObserver: BreakpointObserver,
                 private cdRef: ChangeDetectorRef ) {
    }

    ngOnInit() {

        this.list$ = this.store.pipe(select(fromRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromRoot.getSearchFeaturedList));
        this.listQuery$ = this.store.pipe(select(fromRoot.getSearchQuery));
        this.listPage$ = this.store.pipe(select(fromRoot.getSearchPage));
        this.listTotalPages$ = this.store.pipe(select(fromRoot.getSearchTotalPage));

        this.breakpointSub = this.breakpointObserver
            .observe([
                '(min-width: 1024px)'
            ]).subscribe(result => {
                this._isLargeUp = result.matches;
                this.cdRef.markForCheck();
            });
    }

    public ngOnDestroy(): void {
        this.breakpointSub.unsubscribe();
    }

    public goToPage( event: any ): void {
        this.store.dispatch(new searchActions.SearchList({query: event.listQuery, page: event.page}));
    }

    public openMovieTrailerDialog( res: { audio: IAudio, event: any } ): void {
        // search the movie videos
        this.store.dispatch(new movieVideoActions.Search(res.audio.id));
        const movieVideo$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideo));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.title,
                video$: movieVideo$
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
