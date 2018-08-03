import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OwlDialogService } from 'owl-ng';

import * as fromTvRoot from '../reducers';
import * as tvActions from '../actions/tv';
import * as tvVideoActions from '../actions/video';
import { ITv, IVideo } from '../../model';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-tv-details',
    templateUrl: './tv-details.component.html',
    styleUrls: ['./tv-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvDetailsComponent implements OnInit, OnDestroy {

    @ViewChild('castList') castListRef: ElementRef;
    @ViewChild('castListWrapper') castListWrapperRef: ElementRef;

    public tv$: Observable<ITv>;
    public tvVideos$: Observable<IVideo[]>;
    public castProfileWidth = 96;
    public castListSlideDistance = 0;

    private actionsSubscription: Subscription;

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( private store: Store<fromTvRoot.State>,
                 private appService: AppService,
                 private dialogService: OwlDialogService,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any,
                 private router: Router,
                 private route: ActivatedRoute ) {
        this.actionsSubscription = this.route.params
            .pipe(map(params => {
                return new tvActions.Select({tv_id: params.id});
            }))
            .subscribe(this.store);
    }

    public ngOnInit() {
        this.tv$ = this.store.pipe(select(fromTvRoot.getSelectedTv));
        this.tvVideos$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideos));
    }

    public ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
    }

    public openTvVideoDialog( title: string, videoKey: string, event: any ) {
        const showLoader$ = this.store.pipe(select(fromTvRoot.getSearchTvVideoLoader));
        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: title,
                videoKey: videoKey,
                showLoader$: showLoader$,
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: event.clientX,
            transitionY: event.clientY,
        });
    }

    public openTvSeasonVideoDialog( tv: ITv, season: any, event: any ) {
        this.store.dispatch(new tvVideoActions.SearchTvSeasonVideos({
            tv_id: tv.id,
            season_number: season.season_number,
            season_id: season.id
        }));

        const seasonVideo$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideo));
        const showLoader$ = this.store.pipe(select(fromTvRoot.getSearchTvVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: tv.name + ' -- ' + season.name,
                video$: seasonVideo$,
                showLoader$: showLoader$,
            },
            dialogClass: 'audio-dialog',
            transitionX: event.clientX,
            transitionY: event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new tvVideoActions.Select(tv.id));
        });
    }

    public openTvCreditsDialog( tv: ITv, event: any ): void {
        const dialogRef = this.dialogService.open(CreditsDialogComponent, {
            data: {
                title: tv.name,
                date: tv.first_air_date,
                cast: tv.credits.cast,
                crew: tv.credits.crew,
                imagePath: 'https://image.tmdb.org/t/p/w92/' + tv.poster_path,
            },
            dialogClass: 'credits-dialog',
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });

        dialogRef.afterClosed().subscribe(( result ) => {
            if (result) {
                this.router.navigate(['people/actor', result.people.id]);
            }
        });

        event.preventDefault();
    }

    public rate( tv: ITv ): void {
        console.log(tv.id);
    }

    public slideLeftCastList( event: any ): void {
        if (this.castListSlideDistance > 0) {
            const slideDistance = this.castProfileWidth * 2;
            this.castListSlideDistance -= this.castListSlideDistance > slideDistance ?
                slideDistance : this.castListSlideDistance;
        }
        event.preventDefault();
    }

    public slideRightCastList( event: any ): void {
        const slideDistance = this.castProfileWidth * 2;
        const listWidth = this.castListRef.nativeElement.offsetWidth;
        const listWrapperWidth = this.castListWrapperRef.nativeElement.offsetWidth;
        const remainDistance = listWidth - listWrapperWidth - this.castListSlideDistance;

        if (remainDistance > 0) {
            this.castListSlideDistance += remainDistance > slideDistance ?
                slideDistance : remainDistance;
        }
        event.preventDefault();
    }
}
