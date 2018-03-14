/**
 * book.module
 */

import { NgModule } from '@angular/core';

import { FindBookComponent } from './pages/find-book/find-book.component';
import { BookRoutingModule } from './book.routing';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { BookEffect } from './effects/book.effect';
import { EffectsModule } from '@ngrx/effects';
import { BookSearchComponent } from './book-search/book-search.component';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { BookPreviewListComponent } from './book-preview-list/book-preview-list.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { AddCommasPipe } from './pipes/add-commas.pipe';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookExistGuard } from './guards/book-exist.guard';
import { ViewBookComponent } from './pages/view-book/view-book.component';
import { ViewCollectionComponent } from './pages/view-collection/view-collection.component';
import { CollectionEffect } from './effects/collection.effect';

@NgModule({
    imports: [
        CommonModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatButtonModule,

        BookRoutingModule,
        StoreModule.forFeature('books', reducers),
        EffectsModule.forFeature([BookEffect, CollectionEffect]),
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
        ViewBookComponent,
        ViewCollectionComponent
    ],
    providers: [BookExistGuard],
})
export class BookModule {
}

