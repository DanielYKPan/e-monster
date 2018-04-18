import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISeason, ITv } from '../../model';
import { Subscription } from 'rxjs/Subscription';
import * as tvActions from '../actions/tv';
import { map } from 'rxjs/operators';
import * as fromTvRoot from '../reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
                 private store: Store<fromTvRoot.State> ) {
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
            map((data: {season: ISeason}) => data.season)
        );

        this.tv$ = this.store.pipe(select(fromTvRoot.getSelectedTv));
    }

    public ngOnDestroy(): void {

        this.dataSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

}
