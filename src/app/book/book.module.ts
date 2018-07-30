/**
 * book.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers';
import { BookRoutingModule } from './book.routing';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { ShareModule } from '../share/share.module';
import { SearchListComponent } from './search-list/search-list.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { GoogleBookService } from './book.service';

@NgModule({
    imports: [
        CommonModule,
        BookRoutingModule,
        ShareModule,

        StoreModule.forFeature('books', reducers),
    ],
    exports: [],
    declarations: [
        EllipsisPipe,
        BookComponent,
        BookListComponent,
        SearchListComponent,
        BookCardComponent,
        BookDetailsComponent
    ],
    providers: [
        GoogleBookService,
    ],
})
export class BookModule {
}

