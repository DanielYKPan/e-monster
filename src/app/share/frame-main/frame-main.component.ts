import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-frame-main',
    templateUrl: './frame-main.component.html',
    styleUrls: ['./frame-main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrameMainComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
