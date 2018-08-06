import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { OwlDialogService } from 'owl-ng';
import { Observable } from 'rxjs';

import { IAudio, ITv } from '../../model';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import * as videoActions from '../actions/video';
import * as fromTvRoot from '../reducers';


@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {

    public list$: Observable<ITv[]>;

    public navList = [
        {name: 'Trending', value: 'on_the_air', inform: 'The TV series currently on the air'},
        {name: 'Popular', value: 'popular', inform: 'The current popular TV series'},
        {name: 'Airing Today', value: 'airing_today', inform: 'TV shows that are airing today'},
        {name: 'Anticipated', value: 'anticipated', inform: 'The most anticipated TV series in the next couple years'},
        {name: 'Top Rated', value: 'top_rated', inform: 'The top rated TV series'},
        {name: 'My Collection', value: 'collection', inform: 'My tv collection'},
    ];

    constructor( private store: Store<fromTvRoot.State>,
                 private router: Router,
                 private dialogService: OwlDialogService ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromTvRoot.getTvCollection));
    }

    public handleNavListOptionClick( option: string ) {
        option === 'collection' ?
            this.router.navigate(['tv/collection']) :
            this.router.navigate(['tv/list', option]);
    }

    public openTvTrailerDialog( res: { audio: IAudio | ITv; event: any } ): void {
        // search the tv video
        this.store.dispatch(new videoActions.SearchTvVideos(res.audio.id));
        const tvVideo$ = this.store.pipe(select(fromTvRoot.getSelectedTvVideo));
        const showLoader$ = this.store.pipe(select(fromTvRoot.getSearchTvVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.name,
                video$: tvVideo$,
                showLoader$: showLoader$,
            },
            dialogClass: 'audio-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new videoActions.Select(null));
        });
    }
}
