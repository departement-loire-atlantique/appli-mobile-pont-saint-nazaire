import { Component, OnInit } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';

import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

import { FCM } from '@capacitor-community/fcm';
import { PushModalComponent } from './components/push-modal/push-modal.component';
const fcm = new FCM();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = null;

  public appPages = [
    {
      title: 'Informations',
      url: '/informations'
    },
    {
      title: 'Les autres applis',
      url: '/other-apps'
    },
    {
      title: 'Le département',
      url: '/departement'
    }
  ];

  constructor(private platform: Platform, private modalController: ModalController) {}

  ngOnInit() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        PushNotifications.register().then(() => {
          fcm.subscribeTo({topic: 'psn'});
        });
      }
    });

    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log(token);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log(error);
    });

    // Received while in foreground
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      this.openNotificationModal(notification);
    });

    // Received while in background
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      this.openNotificationModal(notification);
    });
  }

  async openNotificationModal(notification: PushNotification|PushNotificationActionPerformed) {
    const modal = await this.modalController.create({
      component: PushModalComponent,
      cssClass: 'notification-modal',
      componentProps: {
        notification
      }
    });
    modal.present();
  }
}
