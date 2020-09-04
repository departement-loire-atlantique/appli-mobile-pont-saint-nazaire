import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from '../components/back-button/back-button.component';
import { PushModalComponent } from '../components/push-modal/push-modal.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    BackButtonComponent,
    PushModalComponent
  ],
  exports: [
    BackButtonComponent,
    PushModalComponent
  ]
})
export class SharedComponentsModule { }
