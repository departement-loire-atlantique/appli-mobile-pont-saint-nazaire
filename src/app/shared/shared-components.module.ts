import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BackButtonComponent } from '../components/back-button/back-button.component';
import { PushModalComponent } from '../components/push-modal/push-modal.component';
import { RequestFeedbackComponent } from '../components/request-feedback/request-feedback.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    BackButtonComponent,
    PushModalComponent,
    RequestFeedbackComponent
  ],
  exports: [
    BackButtonComponent,
    PushModalComponent,
    RequestFeedbackComponent
  ]
})
export class SharedComponentsModule { }
