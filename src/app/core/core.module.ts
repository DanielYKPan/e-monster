import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';
import { OwlMenuModule, OwlRippleModule } from 'owl-ng';

import { HeaderComponent } from './header/header.component';
import { HeaderSearcherComponent } from './header-searcher/header-searcher.component';
import { FooterSearcherComponent } from './footer-searcher/footer-searcher.component';
import { reducers } from './reducers';
import { environment } from '../../environments/environment';
import { SidenavPanelComponent } from './sidenav-panel/sidenav-panel.component';
import { schema } from './database-schema';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        // Owl NG
        OwlMenuModule,
        OwlRippleModule,

        // ngrx
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production // Restrict extension to log-only mode
        }),
        DBModule.provideDB(schema),
    ],
    exports: [
        HeaderComponent,
        FooterSearcherComponent,
        SidenavPanelComponent,
    ],
    declarations: [
        HeaderComponent,
        HeaderSearcherComponent,
        FooterSearcherComponent,
        SidenavPanelComponent,
    ]
})
export class CoreModule {
}
