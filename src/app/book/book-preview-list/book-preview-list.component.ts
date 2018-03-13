import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-book-preview-list',
    templateUrl: './book-preview-list.component.html',
    styleUrls: ['./book-preview-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class BookPreviewListComponent implements OnInit {

    @HostBinding('class.book-preview-list')
    get bookPreviewListClass(): boolean {
        return true;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
