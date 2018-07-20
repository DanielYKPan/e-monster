import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music.component';
import { TokenExistGuard } from './guards/token-exist.guard';

const routes: Routes = [
    {
        path: '',
        component: MusicComponent,
        canActivate: [TokenExistGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TokenExistGuard,
    ]
})
export class MusicRoutingModule {
}
