import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeaderSearcherComponent } from './header-searcher/header-searcher.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        HeaderComponent
    ],
    declarations: [
        HeaderComponent,
        HeaderSearcherComponent
    ]
})
export class CoreModule {
}
