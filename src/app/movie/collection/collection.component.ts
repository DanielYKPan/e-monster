import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { OwlDialogService } from 'owl-ng';
import { Observable } from 'rxjs';

import { IAudio, IMovie } from '../../model';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import * as fromMovieRoot from '../reducers';
import * as movieVideoActions from '../actions/video';

@Component({
    selector: 'app-movie-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {

    public list$: Observable<IMovie[]>; // Movie List Observable

    public readonly navList = [
        {name: 'Trending', value: 'now_playing', inform: 'The movies currently in theatres'},
        {name: 'Popular', value: 'popular', inform: 'The current popular movies'},
        {name: 'Upcoming', value: 'upcoming', inform: 'The upcoming movies in theatres'},
        {name: 'Anticipated', value: 'anticipated', inform: 'The most anticipated movies in the next couple years'},
        {name: 'Top Rated', value: 'top_rated', inform: 'The top rated movies'},
        {name: 'My Collection', value: 'collection', inform: 'My movie collection'},
    ];

    constructor( private store: Store<fromMovieRoot.State>,
                 private dialogService: OwlDialogService,
                 private router: Router ) {
    }

    ngOnInit() {
        this.list$ = this.store.pipe(select(fromMovieRoot.getMovieCollection));
    }

    public handleNavListOptionClick( option: string ) {
        option === 'collection' ?
            this.router.navigate(['movie/collection']) :
            this.router.navigate(['movie/list', option]);
    }

    /**
     * Open a trailer dialog for a specific movie
     * */
    public openMovieTrailerDialog( res: { audio: IAudio | IMovie, event: any } ): void {
        // search the movie videos
        this.store.dispatch(new movieVideoActions.SearchVideos({movie_id: res.audio.id}));
        const movieVideo$ = this.store.pipe(select(fromMovieRoot.getSelectedMovieVideo));
        const showLoader$ = this.store.pipe(select(fromMovieRoot.getSearchVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.title,
                video$: movieVideo$,
                showLoader$: showLoader$,
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new movieVideoActions.Select({movie_id: null}));
        });
    }
}
