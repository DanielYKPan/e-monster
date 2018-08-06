import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppService } from '../app.service';
import * as fromMoviesRoot from './reducers';
import * as collectionAction from '../user/actions/collection';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

    constructor( private appService: AppService, private store: Store<fromMoviesRoot.State> ) {
    }

    public ngOnInit() {
        this.store.dispatch(new collectionAction.Load());
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
