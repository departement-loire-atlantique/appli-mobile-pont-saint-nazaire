import { Component, OnInit } from '@angular/core';
import { PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-push-modal',
  templateUrl: './push-modal.component.html',
  styleUrls: ['./push-modal.component.scss'],
})
export class PushModalComponent implements OnInit {

  public notification: PushNotification;
  public icon: string;

  constructor(private modalController: ModalController) {}

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
      default:
        this.icon = 'particulier';
        break;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
