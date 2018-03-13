import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromBooks from '../../reducers';
import * as BookActions from '../../actions';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../book';

@Component({
    selector: 'app-view-book',
    templateUrl: './view-book.component.html',
    styleUrls: ['./view-book.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
})
export class ViewBookComponent implements OnInit, OnDestroy {

    public book$: Observable<Book>;

    private routeSub = Subscription.EMPTY;

    @HostBinding('class.view-book-wrapper')
    get viewBookWrapper(): boolean {
        return true;
    }

    constructor( private store: Store<fromBooks.State>,
                 private route: ActivatedRoute ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params
            .pipe(
                map(params => new BookActions.Select(params.id))
            )
            .subscribe(( actions: BookActions.Select ) => {
                this.store.dispatch(actions);
            });

        this.book$ = this.store.pipe(select(fromBooks.getSelectedBook));
    }

    public ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
