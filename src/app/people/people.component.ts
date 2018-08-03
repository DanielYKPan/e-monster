import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent implements OnInit {
    constructor( private appService: AppService ) {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }

}
