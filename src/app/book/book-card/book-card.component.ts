import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../model';

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {

    @Input() book: IBook;

    constructor() {
    }

    ngOnInit() {
    }

}
