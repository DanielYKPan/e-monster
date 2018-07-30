import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }

}
