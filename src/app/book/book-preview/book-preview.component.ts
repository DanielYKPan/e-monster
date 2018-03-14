import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';

@Component({
    selector: 'app-book-preview',
    templateUrl: './book-preview.component.html',
    styleUrls: ['./book-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class BookPreviewComponent implements OnInit {

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

    get thumbnail(): string | boolean {
        if (this.book.volumeInfo.imageLinks) {
            return this.book.volumeInfo.imageLinks.smallThumbnail;
        }

        return false;
    }

    get authors() {
        return this.book.volumeInfo.authors;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
