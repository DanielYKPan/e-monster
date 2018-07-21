import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer-searcher',
    templateUrl: './footer-searcher.component.html',
    styleUrls: ['./footer-searcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterSearcherComponent implements OnInit {

    @ViewChild('searchInputElm') searchInputElmRef: ElementRef;

    public searchQueryOptions = [
        {value: 'movie', name: 'Movies'},
        {value: 'tv', name: 'TV'},
        {value: 'music', name: 'Music'},
        {value: 'book', name: 'Books'},
        {value: 'people', name: 'People'},
    ];

    public searchQueryOption = this.searchQueryOptions[0];

    public inputValue: string;

    constructor( private router: Router,
                 private cdRef: ChangeDetectorRef ) {
    }

    public ngOnInit() {
    }

    public cleanSearchInput( event: any ) {
        this.inputValue = null;
        this.cdRef.markForCheck();
        event.preventDefault();
    }

    public chooseSearchQuery( option: { value: string; name: string }, event: any ) {
        this.searchQueryOption = option;
        this.router.navigate([`/${this.searchQueryOption.value}/search`, {query: this.inputValue}]);
        this.cdRef.markForCheck();
        event.preventDefault();
    }

    public handleKeydownOnSearchInput( event: KeyboardEvent ): void {
        const keyCode = event.keyCode;

        switch (keyCode) {

            case ENTER:
                if (this.inputValue) {
                    this.router.navigate([`/${this.searchQueryOption.value}/search`, {query: this.inputValue}]);
                    this.inputValue = null;
                    this.searchInputElmRef.nativeElement.blur();
                    this.cdRef.markForCheck();
                }
                event.preventDefault();
                return;

            default:
                return;
        }
    }

}
