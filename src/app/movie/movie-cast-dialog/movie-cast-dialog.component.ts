import { AfterContentInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { OWL_DIALOG_DATA, OwlDialogRef } from 'owl-ng';
import { IMovie, IMovieCrew } from '../movie.model';

@Component({
    selector: 'app-movie-cast-dialog',
    templateUrl: './movie-cast-dialog.component.html',
    styleUrls: ['./movie-cast-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCastDialogComponent implements OnInit, AfterContentInit {

    public movie: IMovie;

    get movieDirectors(): IMovieCrew[] {
        return this.movie.crews.filter(( p ) => p.job === 'Director');
    }

    get movieExProducers(): IMovieCrew[] {
        return this.movie.crews.filter(( p ) => p.job === 'Executive Producer');
    }

    get movieProducers(): IMovieCrew[] {
        return this.movie.crews.filter(( p ) => p.job === 'Producer');
    }

    get movieWriters(): IMovieCrew[] {
        return this.movie.crews.filter(( p ) => p.department === 'Writing');
    }

    constructor( public dialogRef: OwlDialogRef<MovieCastDialogComponent>,
                 @Inject(OWL_DIALOG_DATA) public data: any ) {
    }

    ngOnInit() {
    }

    public ngAfterContentInit(): void {
        this.movie = this.data.movie;
    }

    public closeDialog( event: any ): void {
        this.dialogRef.close();
        event.preventDefault();
    }

}