import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music.component';
import { TokenExistGuard } from './guards/token-exist.guard';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicListExistGuard } from './guards/music-list-exist.guard';

const routes: Routes = [
    {
        path: '',
        component: MusicComponent,
        canActivateChild: [TokenExistGuard],
        children: [
            {path: '', redirectTo: 'list/new-releases', pathMatch: 'full'},
            {path: 'list', redirectTo: 'list/new-releases', pathMatch: 'full'},
            {path: 'list/:query', component: MusicListComponent, canActivate: [MusicListExistGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TokenExistGuard,
        MusicListExistGuard,
    ]
})
export class MusicRoutingModule {
}
