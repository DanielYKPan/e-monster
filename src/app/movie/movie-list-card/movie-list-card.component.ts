import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IMovie } from '../movie.model';

@Component({
    selector: 'app-movie-list-card',
    templateUrl: './movie-list-card.component.html',
    styleUrls: ['./movie-list-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListCardComponent implements OnInit {

    @Input() movie: IMovie;

    @Output() addCollection = new EventEmitter<IMovie>();

    @Output() playVideo = new EventEmitter<IMovie>();

    constructor() {
    }

    ngOnInit() {
    }

    public clickAddCollection(event: any): void {
        this.addCollection.emit(this.movie);
        event.preventDefault();
    }

    public clickPlayVideo(event: any): void {
        this.playVideo.emit(this.movie);
        event.preventDefault();
    }
}
