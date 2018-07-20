/**
 * book.routing
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListExistGuard } from './guards/book-list-exist.guard';

export const routes: Routes = [
    // {path: '', component: ViewCollectionComponent},
    // {path: 'find', component: FindBookComponent},
    // {path: ':id', component: ViewBookComponent, canActivate: [BookExistGuard]},

    {
        path: '', component: BookComponent,
        children: [
            {path: '', redirectTo: 'list/combined-print-and-e-book-fiction', pathMatch: 'full'},
            {path: 'list', redirectTo: 'list/combined-print-and-e-book-fiction', pathMatch: 'full'},
            {path: 'list/:query', component: BookListComponent, canActivate: [BookListExistGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        BookListExistGuard
    ]
})
export class BookRoutingModule {
}
