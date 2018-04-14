import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../../movie.model';

@Component({
    selector: 'app-movie-details-header',
    templateUrl: './movie-details-header.component.html',
    styleUrls: ['./movie-details-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsHeaderComponent implements OnInit {

    @Input() movie: IMovie;

    constructor() {
    }

    ngOnInit() {
    }

}
