import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMusicRoot from '../reducers';
import * as fromRoot from '../../reducers';
import { IAlbum } from '../../model';

@Component({
    selector: 'app-music-list',
    templateUrl: './music-list.component.html',
    styleUrls: ['./music-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicListComponent implements OnInit {

    public list$: Observable<IAlbum[]>;

    constructor(private store: Store<fromMusicRoot.State>) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromRoot.getSearchResults));
    }
}
