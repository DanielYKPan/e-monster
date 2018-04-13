import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import * as fromMoviesRoot from '../reducers';
import * as movieAction from '../actions/movie';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { IMovie, IMovieCrew, IMovieVideo } from '../movie.model';
import * as movieVideoActions from '../actions/video';
import { MovieTrailerDialogComponent } from '../movie-trailer-dialog/movie-trailer-dialog.component';
import { OwlDialogService } from 'owl-ng';
import { MovieCastDialogComponent } from '../movie-cast-dialog/movie-cast-dialog.component';

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
    public movieDirectors$: Observable<IMovieCrew[]>;
    public movieWriters$: Observable<IMovieCrew[]>;
    public movieVideos$: Observable<IMovieVideo[]>;
    public castProfileWidth = 96;

    public castListSlideDistance = 0;

    private actionsSubscription: Subscription;

    constructor( private store: Store<fromMoviesRoot.State>,
                 private dialogService: OwlDialogService,
                 private viewportRuler: ViewportRuler,
                 @Inject(DOCUMENT) private document: any,
                 private route: ActivatedRoute ) {
        this.actionsSubscription = this.route.params
            .pipe(map(params => new movieAction.Select(params.id)))
            .subscribe(this.store);
    }

    public ngOnInit() {
        this.movie$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovie));
        this.movieDirectors$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieDirectors));
        this.movieWriters$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieWriters));
        this.movieVideos$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideos));
    }

    public ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
        this.store.dispatch(new movieVideoActions.Select(null));
    }

    public openMovieVideoDialog( title: string, key: string, event: any ): void {
        const dialogRef = this.dialogService.open(MovieTrailerDialogComponent, {
            data: {movieTitle: title, videoKey: key}, // data that would pass to dialog component
            dialogClass: 'movie-trailer-dialog',
            transitionX: event.clientX,
            transitionY: event.clientY,
        });
    }

    public slideLeftCastList( event: any ): void {
        if (this.castListSlideDistance > 0) {
            const slideDistance = this.castProfileWidth * 2;
            this.castListSlideDistance -= this.castListSlideDistance > slideDistance ?
                slideDistance : this.castListSlideDistance;
        }
        event.preventDefault();
    }

    public slideRightCastList( event: any ): void {
        const slideDistance = this.castProfileWidth * 2;
        const listWidth = this.castListRef.nativeElement.offsetWidth;
        const listWrapperWidth = this.castListWrapperRef.nativeElement.offsetWidth;
        const remainDistance = listWidth - listWrapperWidth - this.castListSlideDistance;

        if (remainDistance > 0) {
            this.castListSlideDistance += remainDistance > slideDistance ?
                slideDistance : remainDistance;
        }
        event.preventDefault();
    }

    public openMovieCastDialog( movie: IMovie, event: any ): void {
        const dialogRef = this.dialogService.open(MovieCastDialogComponent, {
            data: {movie},
            dialogClass: 'movie-cast-dialog',
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });
        event.preventDefault();
    }
}
