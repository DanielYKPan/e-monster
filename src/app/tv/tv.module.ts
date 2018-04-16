import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';
import { TvListComponent } from './tv-list/tv-list.component';

@NgModule({
  imports: [
    CommonModule,
    TvRoutingModule
  ],
  declarations: [TvComponent, TvListComponent]
})
export class TvModule { }
