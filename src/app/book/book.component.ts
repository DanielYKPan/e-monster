import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }
}
