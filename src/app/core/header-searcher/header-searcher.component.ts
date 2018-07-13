import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-searcher',
    templateUrl: './header-searcher.component.html',
    styleUrls: ['./header-searcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSearcherComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
