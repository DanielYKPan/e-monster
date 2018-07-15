/**
 * app.routing
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'movie', pathMatch: 'full'},
    {path: 'book', loadChildren: 'app/book/book.module#BookModule'},
    {path: 'movie', loadChildren: 'app/movie/movie.module#MovieModule'},
    {path: 'tv', loadChildren: 'app/tv/tv.module#TvModule'},
    {path: 'people', loadChildren: 'app/people/people.module#PeopleModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
