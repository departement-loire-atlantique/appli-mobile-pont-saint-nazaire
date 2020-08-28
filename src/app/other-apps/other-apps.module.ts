import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherAppsPageRoutingModule } from './other-apps-routing.module';

import { OtherAppsPage } from './other-apps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherAppsPageRoutingModule
  ],
  declarations: [OtherAppsPage]
})
export class OtherAppsPageModule {}
