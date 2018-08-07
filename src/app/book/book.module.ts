/**
 * book.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { BookRoutingModule } from './book.routing';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { ShareModule } from '../share/share.module';
import { SearchListComponent } from './search-list/search-list.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { GoogleBookService } from './book.service';
import { CollectionEffects } from './effects/collection';
import { CollectionComponent } from './collection/collection.component';

@NgModule({
    imports: [
        CommonModule,
        BookRoutingModule,
        ShareModule,

        StoreModule.forFeature('books', reducers),
        EffectsModule.forFeature([CollectionEffects]),
    ],
    exports: [],
    declarations: [
        BookComponent,
        BookListComponent,
        SearchListComponent,
        BookCardComponent,
        BookDetailsComponent,
        CollectionComponent
    ],
    providers: [
        GoogleBookService,
    ],
})
export class BookModule {
}

