import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ICrew, IMovie, IVideo } from '../../../model';

@Component({
    selector: 'app-movie-details-content',
    templateUrl: './movie-details-content.component.html',
    styleUrls: ['./movie-details-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsContentComponent implements OnInit, OnChanges {

    @ViewChild('castList') castListRef: ElementRef;

    @ViewChild('castListWrapper') castListWrapperRef: ElementRef;

    @Input() movie: IMovie;

    @Input() movieVideos: IVideo[];

    @Output() movieVideoClick = new EventEmitter<any>();

    @Output() fullCastCrewClick = new EventEmitter<any>();

    public castProfileWidth = 96;

    public castListSlideDistance = 0;

    // TODO: change it to link in html template
    get movieDirectors(): ICrew[] {
        if (this.movie) {
            return this.movie.credits.crew.filter(( crew ) => crew.job === 'Director');
        }
    }

    // TODO: change it to link in html template
    get movieWriters(): ICrew[] {
        if (this.movie) {
            return this.movie.credits.crew.filter(( crew ) => crew.department === 'Writing');
        }
    }

    constructor() {
    }

    public ngOnInit() {
    }

    public ngOnChanges( changes: SimpleChanges ): void {
        if ((changes['movie'] && !changes['movie'].isFirstChange())) {
            this.scrollBackToTop();
        }
    }

    public clickVideo( video: IVideo, event: any ): void {
        this.movieVideoClick.emit({
            title: this.movie.title,
            videoKey: video.key,
            event
        });
    }

    public clickFullCastCrew( event: any ): void {
        this.fullCastCrewClick.emit({
            movie: this.movie,
            event
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

    private scrollBackToTop(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}
