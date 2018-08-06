import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwlDialogService } from 'owl-ng';

import * as fromMoviesRoot from '../reducers';
import * as movieAction from '../actions/movie';
import * as movieVideoActions from '../actions/video';
import * as collectionAction from '../../user/actions/collection';
import { IAudio, IMovie, IVideo } from '../../model';
import { CreditsDialogComponent } from '../../share/credits-dialog/credits-dialog.component';
import { AudioDialogComponent } from '../../share/audio-dialog/audio-dialog.component';
import { AppService } from '../../app.service';

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
    public mainStaff$: Observable<{ directors: any[], writers: any[] }>;
    public inCollection$: Observable<boolean>;
    public castProfileWidth = 96;
    public castListSlideDistance = 0;

    private actionsSubscription: Subscription;
    private movieId: number;

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( private store: Store<fromMoviesRoot.State>,
                 private dialogService: OwlDialogService,
                 private appService: AppService,
                 private viewportRuler: ViewportRuler,
                 private router: Router,
                 @Inject(DOCUMENT) private document: any,
                 private route: ActivatedRoute ) {
        this.actionsSubscription = this.route.params
            .pipe(map(params => {
                this.appService.scrollBackToTop(true);
                this.movieId = +params.id;
                return new movieAction.Select(this.movieId);
            }))
            .subscribe(this.store);
    }

    public ngOnInit() {
        this.movie$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovie));
        this.movieVideos$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideos));
        this.mainStaff$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieMainStaff));
        this.inCollection$ = this.store.pipe(select(fromMoviesRoot.isSelectedMovieInCollection));
    }

    public ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
        this.store.dispatch(new movieVideoActions.Select(null));
    }

    public openMovieVideoDialog( title: string, videoKey: string, event: any ): void {
        const showLoader$ = this.store.pipe(select(fromMoviesRoot.getSearchVideoLoader));
        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: title,
                videoKey: videoKey,
                showLoader$: showLoader$,
            }, // data that would pass to dialog component
            dialogClass: 'audio-dialog',
            transitionX: event.clientX,
            transitionY: event.clientY,
        });
    }

    public openMovieCreditsDialog( movie: IMovie, event: any ): void {
        const dialogRef = this.dialogService.open(CreditsDialogComponent, {
            data: {
                title: movie.title,
                date: movie.release_date,
                cast: movie.credits.cast,
                crew: movie.credits.crew,
                imagePath: 'https://image.tmdb.org/t/p/w92/' + movie.poster_path,
            },
            dialogClass: 'credits-dialog',
            scrollStrategy: new BlockScrollStrategy(this.viewportRuler, this.document)
        });

        dialogRef.afterClosed().subscribe(( result ) => {
            if (result) {
                this.router.navigate(['people/actor', result.people.id]);
            }
        });

        event.preventDefault();
    }

    public openSimilarMovieVideoDialog( res: { audio: IAudio, event: any } ): void {

        // search the movie videos
        this.store.dispatch(new movieVideoActions.SearchVideos(res.audio.id));
        const movieVideo$ = this.store.pipe(select(fromMoviesRoot.getSelectedMovieVideo));
        const showLoader$ = this.store.pipe(select(fromMoviesRoot.getSearchVideoLoader));

        const dialogRef = this.dialogService.open(AudioDialogComponent, {
            data: {
                title: res.audio.title,
                video$: movieVideo$,
                showLoader$: showLoader$,
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

    public addToCollection( movie: IMovie ) {
        this.store.dispatch(new collectionAction.AddMovie(movie));
    }

    public RemoveFromCollection( movie: any ) {
        this.store.dispatch(new collectionAction.RemoveMovie(movie));
    }
}
