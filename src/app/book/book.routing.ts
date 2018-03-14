/**
 * book.routing
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookExistGuard } from './guards/book-exist.guard';
import { FindBookComponent } from './pages/find-book/find-book.component';
import { ViewBookComponent } from './pages/view-book/view-book.component';
import { ViewCollectionComponent } from './pages/view-collection/view-collection.component';

export const routes: Routes = [
    {path: '', component: ViewCollectionComponent},
    {path: 'find', component: FindBookComponent},
    {path: ':id', component: ViewBookComponent, canActivate: [BookExistGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookRoutingModule {
}
