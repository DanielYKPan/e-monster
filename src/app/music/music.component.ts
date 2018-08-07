import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppService } from '../app.service';
import * as fromMusicRoot from './reducers';
import * as collectionAction from './actions/collection';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicComponent implements OnInit {

    constructor( private appService: AppService,
                 private store: Store<fromMusicRoot.State> ) {
    }

    ngOnInit() {
        this.store.dispatch(new collectionAction.Load());
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
