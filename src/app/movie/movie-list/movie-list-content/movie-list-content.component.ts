import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    SimpleChanges,
    ElementRef,
    Output, EventEmitter
} from '@angular/core';
import { IMovieBasic } from '../../movie.model';

@Component({
    selector: 'app-movie-list-content',
    templateUrl: './movie-list-content.component.html',
    styleUrls: ['./movie-list-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListContentComponent implements OnInit, OnChanges {

    @Input() featuredList: IMovieBasic[];

    @Input() list: IMovieBasic[];

    @Output() addCollection = new EventEmitter<{movie: IMovieBasic, event: any}>();

    @Output() playVideo = new EventEmitter<{movie: IMovieBasic, event: any}>();

    constructor( private elmRef: ElementRef ) {
    }

    public ngOnInit() {
    }

    public ngOnChanges( changes: SimpleChanges ): void {
        if ((changes['list'] && !changes['list'].isFirstChange()) ||
            (changes['featuredList'] && !changes['featuredList'].isFirstChange())) {
            this.scrollBackToTop();
        }
    }

    private scrollBackToTop(): void {
        this.elmRef.nativeElement.scroll({top: 0, behavior: 'smooth'});
    }
}
