import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwlMenuModule, OwlRippleModule } from 'owl-ng';
import { HeaderComponent } from './header/header.component';
import { HeaderSearcherComponent } from './header-searcher/header-searcher.component';
import { FooterSearcherComponent } from './footer-searcher/footer-searcher.component';

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
        HeaderComponent,
        FooterSearcherComponent,
    ],
    declarations: [
        HeaderComponent,
        HeaderSearcherComponent,
        FooterSearcherComponent
    ]
})
export class CoreModule {
}
