/**
 * list-paginator.component
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-list-paginator',
    templateUrl: './list-paginator.component.html',
    styleUrls: ['./list-paginator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListPaginatorComponent implements OnInit {

    @Input() listPage: number;

    @Input() listTotalPages: number;

    @Input() searchName: string;

    @Output() goToPage = new EventEmitter<any>();

    get prevBtnDisable(): boolean {
        return this.listPage === 1;
    }

    get nextBtnDisable(): boolean {
        return this.listPage === this.listTotalPages;
    }

    constructor() {
    }

    public ngOnInit() {
    }

    public prev( event: any ): void {
        this.toPage(this.listPage - 1);
        event.preventDefault();
    }

    public next( event: any ): void {
        this.toPage(this.listPage + 1);
        event.preventDefault();
    }

    private toPage( page: number ): void {
        if (page < 1 || page > this.listTotalPages) {
            return;
        }

        this.goToPage.next({name: this.searchName, page: page});
    }
}
