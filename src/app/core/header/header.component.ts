import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    constructor( private router: Router ) {
    }

    ngOnInit() {
    }

    public handleSearchConfirm( e: any ) {
        this.router.navigate(['search', {type: e.option, query: e.query}]);
    }
}
