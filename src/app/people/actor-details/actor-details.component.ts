import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { OwlDialogService } from 'owl-ng';

import { IActorDetails } from '../../model';
import * as fromPeopleRoot from '../reducers';
import * as actorActions from '../actions/actor';
import { CreditOverviewDialogComponent } from './credit-overview-dialog/credit-overview-dialog.component';

@Component({
    selector: 'app-actor-details',
    templateUrl: './actor-details.component.html',
    styleUrls: ['./actor-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsComponent implements OnInit, OnDestroy {

    public actor$: Observable<IActorDetails>;

    private routeSub = Subscription.EMPTY;

    constructor( private store: Store<fromPeopleRoot.State>,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any,
                 private router: Router,
                 private route: ActivatedRoute,
                 private dialogService: OwlDialogService ) {
    }

    public ngOnInit() {
        this.routeSub = this.route.params
            .pipe(map(params => new actorActions.Select(+params.id)))
            .subscribe(action => this.store.dispatch(action));

        this.actor$ = this.store.pipe(select(fromPeopleRoot.getSelectedActor));
    }

    public ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    public showCreditOverviewDialog( res: any ) {
        const dialogRef = this.dialogService.open(CreditOverviewDialogComponent, {
            data: {
                credit: res.credit,
                type: res.type
            },
            dialogClass: 'audio-dialog audio-overview-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });

        dialogRef.afterClosed().subscribe(( result: any ) => {
            if (result) {
                this.router.navigate([result.type, result.credit.id, 'details']);
            }
        });
    }
}
