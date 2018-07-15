import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IActor } from '../../model/people';
import * as fromPeopleRoot from '../reducers';

@Component({
    selector: 'app-actor-details',
    templateUrl: './actor-details.component.html',
    styleUrls: ['./actor-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorDetailsComponent implements OnInit {

    public actor$: Observable<IActor>;

    constructor( private store: Store<fromPeopleRoot.State> ) {
    }

    public ngOnInit() {
        this.actor$ = this.store.pipe(select(fromPeopleRoot.getSelectedActor));
    }

}
