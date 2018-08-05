import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    @Input() user: User;

    @Output() hamburgerClick = new EventEmitter<any>();

    get offsetHeight(): any {
        return this.elmRef.nativeElement.offsetHeight;
    }

    constructor( private router: Router,
                 private elmRef: ElementRef) {
    }

    ngOnInit() {
    }

    public handleSearchConfirm( e: any ) {
        this.router.navigate([`/${e.option}/search`, {query: e.query}]);
    }
}
