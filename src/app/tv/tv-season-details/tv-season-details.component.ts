import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwlDialogService } from 'owl-ng';

import { ISeason, ITv, IVideo } from '../../model';
import * as fromTvRoot from '../reducers';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import * as tvActions from '../actions/tv';

@Component({
    selector: 'app-tv-season-details',
    templateUrl: './tv-season-details.component.html',
    styleUrls: ['./tv-season-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeasonDetailsComponent implements OnInit, OnDestroy {

    public tv$: Observable<ITv>;
    public tvSeasonVideos$: Observable<IVideo[]>;
    public season$: Observable<ISeason>;
    public season_number: number;

    private actionsSubscription: Subscription;

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private store: Store<fromTvRoot.State>,
                 private dialogService: OwlDialogService,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any, ) {
    }

    public ngOnInit() {
        this.actionsSubscription = this.route.params.pipe(
            map(params => {
                const tv_id = params.id;
                this.season_number = params.number;
                return new tvActions.Select(tv_id);
            })
        ).subscribe(this.store);

        this.tv$ = this.store.pipe(select(fromTvRoot.getSelectedTv));
        this.tvSeasonVideos$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideos));
    }

    public ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
    }

    public openSeasonVideoDialog( e: { title: string, videoKey: string, event: any } ) {
        const showLoader$ = this.store.pipe(select(fromTvRoot.getSearchTvVideoLoader));
        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: e.title,
                videoKey: e.videoKey,
                showLoader$: showLoader$,
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: e.event.clientX,
            transitionY: e.event.clientY,
        });
    }

    public openTvSeasonCreditsDialog( e: { tv: ITv, tvSeason: ISeason, event: any } ): void {
        const dialogRef = this.dialogService.open(CreditsDialogComponent, {
            data: {
                title: e.tv.name + ' ' + e.tvSeason.name,
                date: e.tvSeason.air_date,
                cast: e.tvSeason.credits.cast,
                crew: e.tvSeason.credits.crew,
                imagePath: 'https://image.tmdb.org/t/p/w92/' + e.tvSeason.poster_path,
            },
            dialogClass: 'credits-dialog',
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.router.navigate(['people/actor', result.people.id]);
            }
        });

        e.event.preventDefault();
    }

    public rate( tv: ITv ): void {
        console.log(tv.id);
    }

}
