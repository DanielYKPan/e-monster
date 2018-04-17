import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITv } from '../../../model';

@Component({
    selector: 'app-tv-details-header',
    templateUrl: './tv-details-header.component.html',
    styleUrls: ['./tv-details-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvDetailsHeaderComponent implements OnInit {

    @Input() tv: ITv;

    constructor() {
    }

    ngOnInit() {
    }

}
