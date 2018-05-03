import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-audio-rating-list',
    templateUrl: './rating-list.component.html',
    styleUrls: ['./rating-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingListComponent implements OnInit {

    @Input() vote_average: number;

    @Input() vote_count: number;

    @Input() type: 'movie' | 'tv' = 'movie';

    @Output() rate = new EventEmitter();

    constructor() {
    }

    public ngOnInit() {
    }

}
