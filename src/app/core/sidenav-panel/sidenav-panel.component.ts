import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-sidenav-panel',
    templateUrl: './sidenav-panel.component.html',
    styleUrls: ['./sidenav-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavPanelComponent implements OnInit {

    @Output() sidenavAnchorClick = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

}
