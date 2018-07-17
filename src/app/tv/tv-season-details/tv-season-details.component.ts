import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISeason, ITv, IVideo } from '../../model';
import { map } from 'rxjs/operators';
import * as fromTvRoot from '../reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/common';
import { OwlDialogService } from 'owl-ng';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';

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

    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private store: Store<fromTvRoot.State>,
                 private dialogService: OwlDialogService,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any, ) {
    }

    public ngOnInit() {
        this.season$ = this.route.data.pipe(
            map(( data: { season: ISeason } ) => data.season)
        );

        this.tv$ = this.store.pipe(select(fromTvRoot.getSelectedTv));
        this.tvSeasonVideos$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideos));
    }

    public ngOnDestroy(): void {
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
