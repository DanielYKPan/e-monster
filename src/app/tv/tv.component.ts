import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }
}
