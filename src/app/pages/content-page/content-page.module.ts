import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentPagePageRoutingModule } from './content-page-routing.module';

import { ContentPagePage } from './content-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPagePageRoutingModule
  ],
  declarations: [ContentPagePage]
})
export class ContentPagePageModule {}
