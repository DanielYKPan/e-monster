import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISeason, ITv } from '../../model';
import { Subscription } from 'rxjs/Subscription';
import * as tvActions from '../actions/tv';
import { map } from 'rxjs/operators';
import * as fromTvRoot from '../reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/common';
import { OwlDialogService } from 'owl-ng';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';

@Component({
    selector: 'app-tv-season-details',
    templateUrl: './tv-season-details.component.html',
    styleUrls: ['./tv-season-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeasonDetailsComponent implements OnInit, OnDestroy {

    public tv$: Observable<ITv>;
    public season$: Observable<ISeason>;
    public seasonNumber: number;

    private dataSubscription = Subscription.EMPTY;
    private paramsSubscription = Subscription.EMPTY;

    private tvId: number;

    constructor( private route: ActivatedRoute,
                 private store: Store<fromTvRoot.State>,
                 private dialogService: OwlDialogService,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any, ) {
    }

    public ngOnInit() {

        this.paramsSubscription = this.route.params
            .pipe(map(params => {
                this.tvId = +params.id;
                this.seasonNumber = +params.number;
                return new tvActions.Select(params.id);
            }))
            .subscribe(this.store);

        this.season$ = this.route.data.pipe(
            map(( data: { season: ISeason } ) => data.season)
        );

        this.tv$ = this.store.pipe(select(fromTvRoot.getSelectedTv));
    }

    public ngOnDestroy(): void {

        this.dataSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
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
        e.event.preventDefault();
    }

    public rate( tv: ITv ): void {
        console.log(tv.id);
    }

}
