import { NgModule } from '@angular/core';

import { BackButtonComponent } from '../components/back-button/back-button.component';
import { PushModalComponent } from '../components/push-modal/push-modal.component';

@NgModule({
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
