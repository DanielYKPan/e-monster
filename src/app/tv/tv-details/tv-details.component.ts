import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { select, Store } from '@ngrx/store';
import * as fromTvRoot from '../reducers';
import * as tvActions from '../actions/tv';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ITv } from '../../model';

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

}
