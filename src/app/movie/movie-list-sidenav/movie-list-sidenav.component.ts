import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    @Input() type: string;

    @Output() goToPage = new EventEmitter<any>();

    public items = [
        {name: 'Trending', type: 'now_playing', info: 'The movies currently in theatres'},
        {name: 'Popular', type: 'popular', info: 'The current popular movies'},
        {name: 'Upcoming', type: 'upcoming', info: 'The upcoming movies in theatres'},
        {name: 'Anticipated', type: 'anticipated', info: 'The most anticipated movies in the next couple years'},
        {name: 'Top Rated', type: 'top_rated', info: 'The top rated movies'},
    ];

    get sidenavInfo(): string {
        const current_item = this.items.find(( item ) => item.type === this.type);
        return current_item ? current_item.info : null;
    }

    get sidenavMenuName(): string {
        const current_item = this.items.find(( item ) => item.type === this.type);
        return current_item ? current_item.name : 'Menu';
    }

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

        this.goToPage.next({type: this.type, page: page});
    }
}
