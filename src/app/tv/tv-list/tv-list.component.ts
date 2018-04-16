import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv-list',
    templateUrl: './tv-list.component.html',
    styleUrls: ['./tv-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
