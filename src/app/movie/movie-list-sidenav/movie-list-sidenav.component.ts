import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ISearchStat } from '../movie.model';

@Component({
    selector: 'app-movie-list-sidenav',
    templateUrl: './movie-list-sidenav.component.html',
    styleUrls: ['./movie-list-sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListSidenavComponent implements OnInit {

    @Input() showNavMenu: boolean;

    @Input() searchStat: ISearchStat;

    @Input() query: string;

    @Output() goToPage = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    public prev( event: any ): void {
        this.toPage(this.searchStat.page - 1);
        event.preventDefault();
    }

    public next( event: any ): void {
        this.toPage(this.searchStat.page + 1);
        event.preventDefault();
    }

    private toPage( page: number ): void {
        if (page < 1 || page > this.searchStat.total_pages) {
            return;
        }

        this.goToPage.next({query: this.query, page: page});
    }
}
