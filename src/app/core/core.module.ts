import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeaderSearcherComponent } from './header-searcher/header-searcher.component';
import { FormsModule } from '@angular/forms';
import { OwlMenuModule, OwlRippleModule } from 'owl-ng';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        // Owl NG
        OwlMenuModule,
        OwlRippleModule,
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
