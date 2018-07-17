/**
 * app.routing
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: 'movie', pathMatch: 'full'},
    {path: 'book', loadChildren: 'app/book/book.module#BookModule'},
    {path: 'movie', loadChildren: 'app/movie/movie.module#MovieModule'},
    {path: 'tv', loadChildren: 'app/tv/tv.module#TvModule'},
    {path: 'people', loadChildren: 'app/people/people.module#PeopleModule'},
    {path: 'page-not-found', component: PageNotFoundComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
