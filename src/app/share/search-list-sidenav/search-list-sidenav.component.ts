import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { SearchType } from '../../model';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-search-list-sidenav',
    templateUrl: './search-list-sidenav.component.html',
    styleUrls: ['./search-list-sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchListSidenavComponent implements OnInit, OnDestroy {

    @ViewChild('queryInputElm') queryInputElmRef: ElementRef;

    @Input() listPage: number;

    @Input() listTotalPages: number;

    @Input() listQuery: number;

    @Input() currentOption: SearchType;

    @Output() queryChange = new EventEmitter<any>();

    @Output() clickOption = new EventEmitter<any>();

    @Output() goToPage = new EventEmitter<any>();

    private inputQueryChange = new Subject<string>();

    private inputQueryChange$: Observable<string> = this.inputQueryChange.asObservable();

    private inputQueryChangeSub = Subscription.EMPTY;

    public navList = [
        {name: 'Movie', value: 'movie'},
        {name: 'TV', value: 'tv'},
        {name: 'Music', value: 'music'},
        {name: 'Book', value: 'book'},
        {name: 'People', value: 'people'},
    ];

    constructor() {
    }

    public ngOnInit() {
        this.inputQueryChangeSub = this.inputQueryChange$
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            ).subscribe(( query: string ) => {
                this.queryChange.next({type: this.currentOption, query: query});
            });
    }

    public ngOnDestroy(): void {
        this.inputQueryChangeSub.unsubscribe();
    }

    public handleInputCleanerClick( event: any ) {
        this.queryInputElmRef.nativeElement.value = null;
        this.queryInputElmRef.nativeElement.focus();
        event.preventDefault();
    }

    public handleFilterQueryInput( event: any ) {
        this.inputQueryChange.next(this.queryInputElmRef.nativeElement.value);
    }

    public handleFilterQueryKeydown( event: KeyboardEvent ): void {
        const keyCode = event.keyCode;

        if (keyCode === ENTER && !!this.queryInputElmRef.nativeElement.value) {
            this.inputQueryChange.next(this.queryInputElmRef.nativeElement.value);
        }

        return;
    }
}
