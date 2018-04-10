import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { OWL_DIALOG_DATA, OwlDialogRef } from 'owl-ng';
import { IMovie, IMovieVideo } from '../movie.model';
import * as fromMovieRoot from '../reducers';
import * as movieVideos from '../actions/video';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-movie-trailer-dialog',
    templateUrl: './movie-trailer-dialog.component.html',
    styleUrls: ['./movie-trailer-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTrailerDialogComponent implements OnInit, AfterContentInit, OnDestroy {

    public movie: IMovie;

    public movieVideo$: Observable<IMovieVideo>;

    constructor( public dialogRef: OwlDialogRef<MovieTrailerDialogComponent>,
                 private store: Store<fromMovieRoot.State>,
                 @Inject(OWL_DIALOG_DATA) public data: any ) {
    }

    public ngOnInit() {
    }

    public ngAfterContentInit(): void {
        this.movie = this.data.movie;
        this.store.dispatch(new movieVideos.Search(this.movie.id));

        this.movieVideo$ = this.store.pipe(select(fromMovieRoot.getSelectedMovieVideo));
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new movieVideos.Select(null));
    }

    public closeDialog( event: any ): void {
        this.dialogRef.close();
        event.preventDefault();
    }
}
