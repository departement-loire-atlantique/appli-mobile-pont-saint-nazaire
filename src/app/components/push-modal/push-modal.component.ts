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

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log(this.notification);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
