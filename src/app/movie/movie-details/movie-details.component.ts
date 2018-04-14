import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as movieAction from '../actions/movie';
import * as movieVideoActions from '../actions/video';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { IMovie, IMovieBasic, IMovieVideo } from '../movie.model';
import { MovieTrailerDialogComponent } from '../movie-trailer-dialog/movie-trailer-dialog.component';
import { MovieCastDialogComponent } from '../movie-cast-dialog/movie-cast-dialog.component';
import { OwlDialogService } from 'owl-ng';

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
    public movieVideos$: Observable<IMovieVideo[]>;

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
        const dialogRef = this.dialogService.open(MovieTrailerDialogComponent, {
            data: {movieTitle: e.title, videoKey: e.videoKey}, // data that would pass to dialog component
            dialogClass: 'movie-trailer-dialog',
            transitionX: e.event.clientX,
            transitionY: e.event.clientY,
        });
    }

    public openMovieCastDialog( e: { movie: IMovie, event: any } ): void {
        const dialogRef = this.dialogService.open(MovieCastDialogComponent, {
            data: {movie: e.movie},
            dialogClass: 'movie-cast-dialog',
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });
        e.event.preventDefault();
    }

    public openSimilarMovieVideoDialog( res: { movie: IMovieBasic, event: any } ): void {
        const dialogRef = this.dialogService.open(MovieTrailerDialogComponent, {
            data: {movieId: res.movie.id, movieTitle: res.movie.title},
            dialogClass: 'movie-trailer-dialog',
            transitionX: res.event.clientX,
            transitionY: res.event.clientY,
        });

        dialogRef.afterClosed().subscribe(() => {
            this.store.dispatch(new movieVideoActions.Select(this.movieId));
        });
    }
}
