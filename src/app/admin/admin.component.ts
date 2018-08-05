import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

    constructor( private appService: AppService ) {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
