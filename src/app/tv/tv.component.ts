import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvComponent implements OnInit {

    constructor( private appService: AppService ) {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
