import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { IMovie, IMovieBasic } from '../../movie.model';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
    selector: 'app-movie-details-similar',
    templateUrl: './movie-details-similar.component.html',
    styleUrls: ['./movie-details-similar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsSimilarComponent implements OnInit {

    @ViewChild('movieList') movieListRef: ElementRef;

    @ViewChild('movieListWrapper') movieListWrapperRef: ElementRef;

    @ViewChild('sliderLeftBtn') sliderLeftBtnRef: ElementRef;

    @ViewChild('sliderRightBtn') sliderRightBtnRef: ElementRef;

    @Input() movie: IMovie;

    @Output() playVideo = new EventEmitter<{ movie: IMovieBasic, event: any }>();

    public movieItemWidth = 196;

    public movieListSlideDistance = 0;

    get scrollObservable(): Observable<any> {
        return this.sliderLeftBtnRef && this.sliderLeftBtnRef ?
            merge(
                fromEvent(window, 'scroll'),
                fromEvent(this.sliderLeftBtnRef.nativeElement, 'click'),
                fromEvent(this.sliderRightBtnRef.nativeElement, 'click')
            ) :
            fromEvent(window, 'scroll');
    }

    constructor() {
    }

    ngOnInit() {
    }

    public slideLeftMovieList( event: any ): void {
        if (this.movieListSlideDistance > 0) {
            const slideDistance = this.movieItemWidth * 2;
            this.movieListSlideDistance -= this.movieListSlideDistance > slideDistance ?
                slideDistance : this.movieListSlideDistance;
        }
        event.preventDefault();
    }

    public slideRightMovieList( event: any ): void {
        const slideDistance = this.movieItemWidth * 2;
        const listWidth = this.movieListRef.nativeElement.offsetWidth;
        const listWrapperWidth = this.movieListWrapperRef.nativeElement.offsetWidth;
        const remainDistance = listWidth - listWrapperWidth - this.movieListSlideDistance;

        if (remainDistance > 0) {
            this.movieListSlideDistance += remainDistance > slideDistance ?
                slideDistance : remainDistance;
        }
        event.preventDefault();
    }
}
