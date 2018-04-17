import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-movie-list-sidenav',
    templateUrl: './movie-list-sidenav.component.html',
    styleUrls: ['./movie-list-sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListSidenavComponent implements OnInit {

    @Input() showNavMenu: boolean;

    @Input() listPage: number;

    @Input() listTotalPages: number;

    @Input() listQuery: string;

    @Output() goToPage = new EventEmitter<any>();

    public items = [
        {name: 'Trending', listQuery: 'now_playing', info: 'The movies currently in theatres'},
        {name: 'Popular', listQuery: 'popular', info: 'The current popular movies'},
        {name: 'Upcoming', listQuery: 'upcoming', info: 'The upcoming movies in theatres'},
        {name: 'Anticipated', listQuery: 'anticipated', info: 'The most anticipated movies in the next couple years'},
        {name: 'Top Rated', listQuery: 'top_rated', info: 'The top rated movies'},
    ];

    get sidenavInfo(): string {
        const current_item = this.items.find(( item ) => item.listQuery === this.listQuery);
        return current_item ? current_item.info : null;
    }

    get sidenavMenuName(): string {
        const current_item = this.items.find(( item ) => item.listQuery === this.listQuery);
        return current_item ? current_item.name : 'Menu';
    }

    constructor() {
    }

    ngOnInit() {
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

        this.goToPage.next({listQuery: this.listQuery, page: page});
    }
}
