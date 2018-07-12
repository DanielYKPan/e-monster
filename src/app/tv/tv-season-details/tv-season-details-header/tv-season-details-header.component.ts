import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISeason, ITv } from '../../../model';

@Component({
    selector: 'app-tv-season-details-header',
    templateUrl: './tv-season-details-header.component.html',
    styleUrls: ['./tv-season-details-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeasonDetailsHeaderComponent implements OnInit {

    @Input() tv: ITv;

    @Input() season: ISeason;

    @Output() rate = new EventEmitter<ITv>();

    get seasonIndex(): number {
        return this.tv.seasons.findIndex(( season ) => {
            return season.season_number === this.season.season_number;
        });
    }

    get hidePreviousLink(): boolean {
        return this.seasonIndex === 0;
    }

    get hideNextLink(): boolean {
        return this.seasonIndex === this.tv.seasons.length - 1;
    }

    get PreviousSeasonNumber(): number {
        if (!this.hidePreviousLink) {
            return this.tv.seasons[this.seasonIndex - 1].season_number;
        }
    }

    get NextSeasonNumber(): number {
        if (!this.hideNextLink) {
            return this.tv.seasons[this.seasonIndex + 1].season_number;
        }
    }

    constructor() {
    }

    ngOnInit() {
    }

}
