import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMusicRoot from '../reducers';
import { IAlbum } from '../../model';

@Component({
    selector: 'app-album-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {

    public list$: Observable<IAlbum[]>;

    public navList = [
        {name: 'New Releases', value: 'new-releases', inform: 'New album releases featured in Spotify'},
        {name: 'Hipster', value: 'tag:hipster', inform: 'Albums with high popularity in Spotify'},
        {name: 'My Collection', value: 'collection', inform: 'My movie collection'},
    ];

    constructor( private store: Store<fromMusicRoot.State>,
                 private router: Router ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromMusicRoot.getAlbumCollection));
    }

    public handleNavListOptionClick( option: string ) {
        option === 'collection' ?
            this.router.navigate(['music/collection']) :
            this.router.navigate(['music/list', option]);
    }

    /**
     * Handle select album action
     * */
    public handleSelectAlbum( albumId: string ) {
        this.router.navigate(['music/album', albumId]);
    }
}
