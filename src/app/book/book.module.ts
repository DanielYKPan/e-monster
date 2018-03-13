/**
 * book.module
 */

import { NgModule } from '@angular/core';

import { FindBookComponent } from './pages/find-book/find-book.component';
import { BookRoutingModule } from './book.routing';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { BookEffect } from './book.effect';
import { EffectsModule } from '@ngrx/effects';
import { BookSearchComponent } from './book-search/book-search.component';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { BookPreviewListComponent } from './book-preview-list/book-preview-list.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { AddCommasPipe } from './pipes/add-commas.pipe';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookExistGuard } from './guards/book-exist.guard';
import { ViewBookComponent } from './pages/view-book/view-book.component';

@NgModule({
    imports: [
        CommonModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,

        BookRoutingModule,
        StoreModule.forFeature('books', reducers),
        EffectsModule.forFeature([BookEffect]),
    ],
    exports: [],
    declarations: [
        EllipsisPipe,
        AddCommasPipe,
        FindBookComponent,
        BookSearchComponent,
        BookPreviewListComponent,
        BookPreviewComponent,
        BookDetailsComponent,
        ViewBookComponent
    ],
    providers: [BookExistGuard],
})
export class BookModule {
}

