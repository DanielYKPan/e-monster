import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvComponent } from './tv.component';
import { TvListComponent } from './tv-list/tv-list.component';

const routes: Routes = [
    {
        path: '',
        component: TvComponent,
        children: [
            {path: '', redirectTo: 'list/on_the_air', pathMatch: 'full'},
            {path: 'list/:type', component: TvListComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TvRoutingModule {
}
