import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    @Output() hamburgerClick = new EventEmitter<any>();

    constructor( private router: Router ) {
    }

    ngOnInit() {
    }

    public handleSearchConfirm( e: any ) {
        this.router.navigate([`/${e.option}/search`, {query: e.query}]);
    }
}
