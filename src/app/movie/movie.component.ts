import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

    constructor( private appService: AppService ) {
    }

    public ngOnInit() {
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
