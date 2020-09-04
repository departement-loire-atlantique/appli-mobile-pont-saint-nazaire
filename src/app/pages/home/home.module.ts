import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailspertubationComponent } from 'src/app/components/detailspertubation/detailspertubation.component';
import { PertubationsComponent } from 'src/app/components/pertubations/pertubations.component';
import { FilterByPropertyPipe } from 'src/app/shared/filter-by-property.pipe';

import { SvgMapComponent } from '../../components/svg-map/svg-map.component';
import { TrafficDirectionComponent } from '../../components/traffic-direction/traffic-direction.component';
import { SharedComponentsModule } from '../../shared/shared-components.module';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [
    HomePage,
    SvgMapComponent,
    TrafficDirectionComponent,
    PertubationsComponent,
    FilterByPropertyPipe,
    DetailspertubationComponent
  ],
  exports: [
    FilterByPropertyPipe
  ],
  providers: [
    FilterByPropertyPipe
  ]
})
export class HomePageModule { }
