import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SvgMapComponent } from '../../components/svg-map/svg-map.component';
import { TrafficDirectionComponent } from '../../components/traffic-direction/traffic-direction.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, SvgMapComponent, TrafficDirectionComponent],
  exports: [SvgMapComponent, TrafficDirectionComponent]
})
export class HomePageModule {}
