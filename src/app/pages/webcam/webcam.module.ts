import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedComponentsModule } from '../../shared/shared-components.module';

import { WebcamPageRoutingModule } from './webcam-routing.module';
import { WebcamPage } from './webcam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebcamPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [WebcamPage]
})
export class WebcamPageModule { }
