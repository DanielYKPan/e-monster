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
import { IAudio } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as fromTvsRoot from '../reducers';
import * as fromRoot from '../../reducers';
import * as videoActions from '../actions/video';
import { OwlDialogService } from 'owl-ng';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
import { skip } from 'rxjs/operators';

@Component({
    selector: 'app-tv-list',
    templateUrl: './tv-list.component.html',
    styleUrls: ['./tv-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvListComponent implements OnInit, AfterContentInit, OnDestroy {

    @ViewChild('frameMainElm') frameMainElmRef: ElementRef;

    public list$: Observable<IAudio[]>;

    public featuredList$: Observable<IAudio[]>;

    public listName$: Observable<string>;

    public listPage$: Observable<number>;

    public listTotalPages$: Observable<number>;

    public navList = [
        {name: 'Trending', value: 'on_the_air', inform: 'The TV series currently on the air'},
        {name: 'Popular', value: 'popular', inform: 'The current popular TV series'},
        {name: 'Airing Today', value: 'airing_today', inform: 'TV shows that are airing today'},
        {name: 'Anticipated', value: 'anticipated', inform: 'The most anticipated TV series in the next couple years'},
        {name: 'Top Rated', value: 'top_rated', inform: 'The top rated TV series'},
    ];

    private scrollBackTopSub = Subscription.EMPTY;

    constructor( private router: Router,
                 private store: Store<fromTvsRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    public ngOnInit() {
        this.list$ = this.store.pipe(select(fromRoot.getSearchNonFeaturedList));
        this.featuredList$ = this.store.pipe(select(fromRoot.getSearchFeaturedList));
        this.listName$ = this.store.pipe(select(fromRoot.getSearchName));
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

    public handleNavListOptionClick( name: string ) {
        this.router.navigate(['tv/list', name]);
    }

    public goToPage( event: any ): void {
        this.router.navigate(['tv/list', event.name, {page: event.page}]);
    }

    public openTvTrailerDialog( res: { audio: IAudio; event: any } ): void {
        // search the tv video
        this.store.dispatch(new videoActions.SearchTvVideos(res.audio.id));
        const tvVideo$ = this.store.pipe(select(fromTvsRoot.getSelectedTvVideo));
        const showLoader$ = this.store.pipe(select(fromRoot.getSearchVideoTypeLoader));

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

    private scrollBackToTop(): void {
        this.frameMainElmRef.nativeElement.scroll({top: 0, behavior: 'smooth'});
    }
}
