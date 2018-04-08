import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { IMovie } from '../movie.model';

@Component({
    selector: 'app-movie-list-content',
    templateUrl: './movie-list-content.component.html',
    styleUrls: ['./movie-list-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListContentComponent implements OnInit, OnChanges {

    @Input() featuredList: IMovie[];

    @Input() list: IMovie[];

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

    public addCollection(movie: IMovie): void {
        console.log(movie.title + ' Not Implemented Yet!!!'); // TODO: need to implement
    }

    public playVideo(movie: IMovie): void {
        console.log(movie.title + ' Not Implemented Yet!!!'); // TODO: need to implement
    }

    private scrollBackToTop(): void {
        this.elmRef.nativeElement.scroll({ top: 0, behavior: 'smooth' });
    }
}
