import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchType } from '../../model';

@Component({
    selector: 'app-search-list-sidenav',
    templateUrl: './search-list-sidenav.component.html',
    styleUrls: ['./search-list-sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListSidenavComponent implements OnInit {

    @Input() listPage: number;

    @Input() listTotalPages: number;

    @Input() listQuery: number;

    @Input() currentOption: SearchType;

    @Output() goToPage = new EventEmitter<any>();

    public navList = [
        {name: 'Movie', value: 'movie'},
        {name: 'TV', value: 'tv'},
        {name: 'Music', value: 'music'},
        {name: 'Book', value: 'book'},
        {name: 'People', value: 'people'},
    ];

    constructor() {
    }

    ngOnInit() {
    }
}
