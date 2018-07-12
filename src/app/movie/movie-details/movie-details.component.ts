import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as movieAction from '../actions/movie';
import * as movieVideoActions from '../actions/video';
import * as searchActions from '../../search/actions';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { OwlDialogService } from 'owl-ng';
import { IAudio, IMovie, IVideo } from '../../model';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

    @ViewChild('castList') castListRef: ElementRef;

    @ViewChild('castListWrapper') castListWrapperRef: ElementRef;

    public movie$: Observable<IMovie>;
    public movieVideos$: Observable<IVideo[]>;

    private actionsSubscription: Subscription;

    private movieId: number;

    constructor( private store: Store<fromMoviesRoot.State>,
                 private dialogService: OwlDialogService,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any,
                 private route: ActivatedRoute ) {
        this.actionsSubscription = this.route.params
            .pipe(map(params => {
                this.movieId = params.id;
                return new movieAction.Select(params.id);
            }))
            .subscribe(this.store);
    }

    public ngOnInit() {
        this.movie$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovie));
        this.movieVideos$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideos));
    }

    public ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
        this.store.dispatch(new movieVideoActions.Select(null));
    }

    public openMovieVideoDialog( e: { title: string, videoKey: string, event: any } ): void {
        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: e.title,
                videoKey: e.videoKey
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: e.event.clientX,
            transitionY: e.event.clientY,
        });
    }

    public openMovieCreditsDialog( e: { movie: IMovie, event: any } ): void {
        const dialogRef = this.dialogService.open(CreditsDialogComponent, {
            data: {
                title: e.movie.title,
                date: e.movie.release_date,
                cast: e.movie.credits.cast,
                crew: e.movie.credits.crew,
                imagePath: 'https://image.tmdb.org/t/p/w92/' + e.movie.poster_path,
            },
            dialogClass: 'credits-dialog',
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });
        e.event.preventDefault();
    }

    public openSimilarMovieVideoDialog( res: { audio: IAudio, event: any } ): void {

        // search the movie videos
        this.store.dispatch(new searchActions.SearchVideos(res.audio.id));
        const movieVideo$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideo));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.title,
                video$: movieVideo$
            },
            dialogClass: 'audio-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new movieVideoActions.Select(this.movieId));
        });
    }

    public rate( movie: IMovie ): void {
        console.log(movie.id);
    }
}
