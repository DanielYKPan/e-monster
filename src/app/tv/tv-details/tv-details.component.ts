import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from '../reducers';
import * as tvActions from '../actions/tv';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ITv } from '../../model';
import { OwlDialogService } from 'owl-ng';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-tv-details',
    templateUrl: './tv-details.component.html',
    styleUrls: ['./tv-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvDetailsComponent implements OnInit, OnDestroy {

    public tv$: Observable<ITv>;

    private actionsSubscription: Subscription;

    private tvId: number;

    constructor( private store: Store<fromTvRoot.State>,
                 private dialogService: OwlDialogService,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any,
                 private route: ActivatedRoute ) {
        this.actionsSubscription = this.route.params
            .pipe(map(params => {
                this.tvId = params.id;
                return new tvActions.Select(params.id);
            }))
            .subscribe(this.store);
    }

    public ngOnInit() {
        this.tv$ = this.store.pipe(select(fromTvRoot.getSelectedTv));
    }

    public ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
    }

    public openTvCreditsDialog( e: { tv: ITv, event: any } ): void {
        const dialogRef = this.dialogService.open(CreditsDialogComponent, {
            data: {
                title: e.tv.name,
                date: e.tv.first_air_date,
                cast: e.tv.credits.cast,
                crew: e.tv.credits.crew,
                imagePath: 'https://image.tmdb.org/t/p/w92/' + e.tv.poster_path,
            },
            dialogClass: 'credits-dialog',
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });
        e.event.preventDefault();
    }

}
