import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicComponent implements OnInit {

    constructor( private appService: AppService ) {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
