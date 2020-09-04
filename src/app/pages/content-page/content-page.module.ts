import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedComponentsModule } from '../../shared/shared-components.module';

import { ContentPagePageRoutingModule } from './content-page-routing.module';
import { ContentPagePage } from './content-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPagePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ContentPagePage]
})
export class ContentPagePageModule { }
