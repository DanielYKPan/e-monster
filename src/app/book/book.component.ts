import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

    constructor( private appService: AppService ) {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        this.appService.scrollBackToTop(false);
    }
}
