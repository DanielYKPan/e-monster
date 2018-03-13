import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class BookDetailsComponent implements OnInit {

    @Input() book: Book;

    get id() {
        return this.book.id;
    }

    get title() {
        return this.book.volumeInfo.title;
    }

    get subtitle() {
        return this.book.volumeInfo.subtitle;
    }

    get description() {
        return this.book.volumeInfo.description;
    }

    get thumbnail() {
        return (
            this.book.volumeInfo.imageLinks &&
            this.book.volumeInfo.imageLinks.smallThumbnail
        );
    }

    get authors() {
        return this.book.volumeInfo.authors;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
