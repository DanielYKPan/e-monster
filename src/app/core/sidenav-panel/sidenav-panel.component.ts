import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav-panel',
    templateUrl: './sidenav-panel.component.html',
    styleUrls: ['./sidenav-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavPanelComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
