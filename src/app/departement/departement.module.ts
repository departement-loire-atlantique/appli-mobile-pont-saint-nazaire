import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartementPageRoutingModule } from './departement-routing.module';

import { DepartementPage } from './departement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartementPageRoutingModule
  ],
  declarations: [DepartementPage]
})
export class DepartementPageModule {}
