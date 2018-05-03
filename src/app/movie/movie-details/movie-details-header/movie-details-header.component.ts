import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from '../../../model';

@Component({
    selector: 'app-movie-details-header',
    templateUrl: './movie-details-header.component.html',
    styleUrls: ['./movie-details-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsHeaderComponent implements OnInit {

    @Input() movie: IMovie;

    @Output() rate = new EventEmitter<IMovie>();

    constructor() {
    }

    ngOnInit() {
    }

}
