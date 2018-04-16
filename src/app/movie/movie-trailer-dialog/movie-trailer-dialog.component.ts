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
import * as fromMovieRoot from '../reducers';
import * as movieVideos from '../actions/video';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IVideo } from '../../model';

@Component({
    selector: 'app-movie-trailer-dialog',
    templateUrl: './movie-trailer-dialog.component.html',
    styleUrls: ['./movie-trailer-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieTrailerDialogComponent implements OnInit, AfterContentInit, OnDestroy {

    public movieTitle: string;

    public videoKey: string;

    public movieVideo$: Observable<IVideo>;

    constructor( public dialogRef: OwlDialogRef<MovieTrailerDialogComponent>,
                 private store: Store<fromMovieRoot.State>,
                 @Inject(OWL_DIALOG_DATA) public data: any ) {
    }

    public ngOnInit() {
    }

    public ngAfterContentInit(): void {

        this.movieTitle = this.data.movieTitle;

        if (this.data.movieId) {
            this.store.dispatch(new movieVideos.Search(this.data.movieId));
            this.movieVideo$ = this.store.pipe(select(fromMovieRoot.getSelectedMovieVideo));
        } else if (this.data.videoKey) {
            this.videoKey = this.data.videoKey;
        }
    }

    public ngOnDestroy(): void {
    }

    public closeDialog( event: any ): void {
        this.dialogRef.close();
        event.preventDefault();
    }
}
