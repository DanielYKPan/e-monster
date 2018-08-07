import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music.component';
import { TokenExistGuard } from './guards/token-exist.guard';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicListExistGuard } from './guards/music-list-exist.guard';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumExistGuard } from './guards/album-exist.guard';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchListExistGuard } from './guards/search-list-exist.guard';
import { CollectionComponent } from './collection/collection.component';
import { AuthGuard } from '../user/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MusicComponent,
        canActivateChild: [TokenExistGuard],
        children: [
            {path: '', redirectTo: 'list/new-releases', pathMatch: 'full'},
            {path: 'list', redirectTo: 'list/new-releases', pathMatch: 'full'},
            {path: 'list/:query', component: MusicListComponent, canActivate: [MusicListExistGuard]},
            {path: 'search', component: SearchListComponent, canActivate: [SearchListExistGuard]},
            {path: 'album/:id', component: AlbumDetailsComponent, canActivate: [AlbumExistGuard]},
            {path: 'collection', component: CollectionComponent, canActivate: [AuthGuard]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TokenExistGuard,
        MusicListExistGuard,
        AlbumExistGuard,
        SearchListExistGuard,
    ]
})
export class MusicRoutingModule {
}
