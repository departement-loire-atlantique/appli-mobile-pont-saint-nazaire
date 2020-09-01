import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SvgMapComponent } from '../../components/svg-map/svg-map.component';
import { PertubationsComponent } from 'src/app/components/pertubations/pertubations.component';
import { FilterByPropertyPipe } from 'src/app/shared/filter-by-property.pipe';
import { DetailspertubationComponent } from 'src/app/components/detailspertubation/detailspertubation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, SvgMapComponent, PertubationsComponent, FilterByPropertyPipe, DetailspertubationComponent],
  exports: [SvgMapComponent]
})
export class HomePageModule {}
