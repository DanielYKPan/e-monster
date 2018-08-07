/**
 * book.routing
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListExistGuard } from './guards/book-list-exist.guard';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchListExistGuard } from './guards/search-list-exist.guard';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookExistGuard } from './guards/book-exist.guard';
import { CollectionComponent } from './collection/collection.component';
import { AuthGuard } from '../user/guards/auth.guard';

export const routes: Routes = [
    {
        path: '', component: BookComponent,
        children: [
            {path: '', redirectTo: 'list/combined-print-and-e-book-fiction', pathMatch: 'full'},
            {path: 'list', redirectTo: 'list/combined-print-and-e-book-fiction', pathMatch: 'full'},
            {path: 'list/:query', component: BookListComponent, canActivate: [BookListExistGuard]},
            {path: 'search', component: SearchListComponent, canActivate: [SearchListExistGuard]},
            {path: ':id/details', component: BookDetailsComponent, canActivate: [BookExistGuard]},
            {path: 'collection', component: CollectionComponent, canActivate: [AuthGuard]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        SearchListExistGuard,
        BookListExistGuard,
        BookExistGuard,
    ]
})
export class BookRoutingModule {
}
