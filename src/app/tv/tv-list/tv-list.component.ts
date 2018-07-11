import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { select, Store } from '@ngrx/store';
import { IAudio } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as fromTvsRoot from '../reducers';
import * as fromRoot from '../../reducers';
import * as searchActions from '../../search/actions';
import * as videoActions from '../actions/video';
import { Subscription } from 'rxjs/Subscription';
import { OwlDialogService } from 'owl-ng';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';

@Component({
    selector: 'app-tv-list',
    templateUrl: './tv-list.component.html',
    styleUrls: ['./tv-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvListComponent implements OnInit, OnDestroy {

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

    constructor( private store: Store<fromTvsRoot.State>,
                 private dialogService: OwlDialogService,
                 private breakpointObserver: BreakpointObserver,
                 private cdRef: ChangeDetectorRef ) {
    }

    public ngOnInit() {
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

    public openTvTrailerDialog( res: { audio: IAudio; event: any } ): void {
        // search the tv video
        this.store.dispatch(new videoActions.Search(res.audio.id));
        const tvVideo$ = this.store.pipe(select(fromTvsRoot.getSelectedTvVideo));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.name,
                video$: tvVideo$
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
