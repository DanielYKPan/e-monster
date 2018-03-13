import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-book-search',
    templateUrl: './book-search.component.html',
    styleUrls: ['./book-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class BookSearchComponent implements OnInit {

    @Input() value: string;

    @Input() loading = false;

    @Input() error: string;

    @Output() search = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
    }
}
