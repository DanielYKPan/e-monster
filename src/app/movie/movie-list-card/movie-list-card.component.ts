import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from '../movie.model';

@Component({
    selector: 'app-movie-list-card',
    templateUrl: './movie-list-card.component.html',
    styleUrls: ['./movie-list-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListCardComponent implements OnInit {

    @Input() movie: IMovie;

    @Output() addCollection = new EventEmitter<{ movie: IMovie, event: any }>();

    @Output() playVideo = new EventEmitter<{ movie: IMovie, event: any }>();


    get movieImage(): string {
        return this.movie.backdrop_path || this.movie.poster_path;
    }

    constructor() {
    }

    ngOnInit() {
    }

    public clickAddCollection( event: any ): void {
        this.addCollection.emit({movie: this.movie, event});
        event.preventDefault();
    }

    public clickPlayVideo( event: any ): void {
        this.playVideo.emit({movie: this.movie, event});
        event.preventDefault();
    }
}
