import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwlDialogService } from 'owl-ng';

import { ISeason, ITv, IVideo } from '../../model';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import * as tvActions from '../actions/tv';
import * as fromTvRoot from '../reducers';

@Component({
    selector: 'app-tv-season-details',
    templateUrl: './tv-season-details.component.html',
    styleUrls: ['./tv-season-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeasonDetailsComponent implements OnInit, OnDestroy {

    @ViewChild('castList') castListRef: ElementRef;
    @ViewChild('castListWrapper') castListWrapperRef: ElementRef;

    public tvSeasonVideos$: Observable<IVideo[]>;
    public tv_season$: Observable<{tv: ITv, season: ISeason, season_index: number}>;
    public castProfileWidth = 96;
    public castListSlideDistance = 0;

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
                const season_number = params.number;
                return new tvActions.Select({tv_id, season_number});
            })
        ).subscribe(this.store);

        this.tvSeasonVideos$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideos));
        this.tv_season$ = this.store.pipe(select(fromTvRoot.getSelectedSeason));
    }

    public ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
    }

    public openSeasonVideoDialog(tv_season: any, videoKey: string, event: any) {
        const showLoader$ = this.store.pipe(select(fromTvRoot.getSearchTvVideoLoader));
        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: tv_season.tv.name + ' -- ' + tv_season.season.name,
                videoKey: videoKey,
                showLoader$: showLoader$,
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: event.clientX,
            transitionY: event.clientY,
        });
    }

    public openTvSeasonCreditsDialog( tv_season: any, event: any): void {
        const dialogRef = this.dialogService.open(CreditsDialogComponent, {
            data: {
                title: tv_season.tv.name + ' -- ' + tv_season.season.name,
                date: tv_season.season.tvSeason.air_date,
                cast: tv_season.season.tvSeason.credits.cast,
                crew: tv_season.season.tvSeason.credits.crew,
                imagePath: 'https://image.tmdb.org/t/p/w92/' + tv_season.season.poster_path,
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
