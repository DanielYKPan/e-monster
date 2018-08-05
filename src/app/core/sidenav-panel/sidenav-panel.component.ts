import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../model';

@Component({
    selector: 'app-sidenav-panel',
    templateUrl: './sidenav-panel.component.html',
    styleUrls: ['./sidenav-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavPanelComponent implements OnInit {

    @Input() user: User;

    @Output() sidenavAnchorClick = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

}
