import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAlbum } from '../../model';
import * as fromMusicRoot from '../reducers';
import * as musicActions from '../actions/music';


@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html',
    styleUrls: ['./album-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {

    public album$: Observable<IAlbum>;

    private routeSub = Subscription.EMPTY;

    constructor( private route: ActivatedRoute,
                 private store: Store<fromMusicRoot.State> ) {
    }

    public ngOnInit() {
        this.routeSub = this.route.params
            .pipe(map(params => new musicActions.Select(params.id)))
            .subscribe(action => this.store.dispatch(action));

        this.album$ = this.store.pipe(select(fromMusicRoot.getSelectedAlbum));
    }

    public ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
