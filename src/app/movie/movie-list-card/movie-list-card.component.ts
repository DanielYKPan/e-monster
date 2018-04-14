import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { IMovieBasic } from '../movie.model';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-movie-list-card',
    templateUrl: './movie-list-card.component.html',
    styleUrls: ['./movie-list-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListCardComponent implements OnInit {

    @Input() movie: IMovieBasic;

    @Input() imageType: 'backdrop' | 'poster' = 'backdrop';

    @Input() showTitle = true;

    @Input() scrollTarget: HTMLElement;

    @Input() scrollObservable: Observable<any>;

    @Output() addCollection = new EventEmitter<{ movie: IMovieBasic, event: any }>();

    @Output() playVideo = new EventEmitter<{ movie: IMovieBasic, event: any }>();

    get movieImage(): string {
        return this.imageType === 'backdrop' ?
            this.movie.backdrop_path : this.movie.poster_path;
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
