import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OwlDialogService } from 'owl-ng';

import { IActor } from '../../model';
import * as fromPeopleRoot from '../reducers';
import { CreditOverviewDialogComponent } from './credit-overview-dialog/credit-overview-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-actor-details',
    templateUrl: './actor-details.component.html',
    styleUrls: ['./actor-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsComponent implements OnInit {

    public actor$: Observable<IActor>;

    constructor( private store: Store<fromPeopleRoot.State>,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any,
                 private router: Router,
                 private dialogService: OwlDialogService ) {
    }

    public ngOnInit() {
        this.actor$ = this.store.pipe(select(fromPeopleRoot.getSelectedActor));
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
