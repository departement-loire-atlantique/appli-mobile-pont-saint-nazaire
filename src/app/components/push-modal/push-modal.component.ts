import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CG44Notification } from '../../models/notification';

@Component({
  selector: 'app-push-modal',
  templateUrl: './push-modal.component.html',
  styleUrls: ['./push-modal.component.scss'],
})
export class PushModalComponent implements OnInit {

  public notification: CG44Notification;
  public icon: string;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    switch (this.notification.data.type.toLowerCase()) {
      case 'accident':
        this.icon = 'accident';
        break;
      case 'travaux':
        this.icon = 'travaux';
        break;
      case 'vent':
        this.icon = 'vent-fort';
        break;
      case 'deviation':
        this.icon = 'deviation';
        break;
      default:
        this.icon = 'mode-particulier';
        break;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
