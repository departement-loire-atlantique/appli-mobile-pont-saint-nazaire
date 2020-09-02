import { Component, OnInit } from '@angular/core';

import { Platform, ModalController, AlertController } from '@ionic/angular';

import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

import { FCM } from '@capacitor-community/fcm';
import { PushModalComponent } from './components/push-modal/push-modal.component';
import { StorageService } from './services/storage.service';
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

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.storageService.get('is-subscribed').then(value => {
      console.log(value);

      if (value) {
        this.enableNotifications();
      }
      if (value === null) {
        this.askForSubscription();
      }
    });
  }

  async askForSubscription() {
    const askAlert = await this.alertController.create({
      header: 'Notifications',
      message: 'Souhaitez-vous activer les notifications ?',
      buttons: [{
        text: 'Non merci',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: () => {
          this.storageService.set('is-subscribed', true);
          this.enableNotifications();
        }
      }]
    });
    return await askAlert.present();
  }

  enableNotifications() {
    if (!this.platform.is('capacitor')) {
      return;
    }

    // Only for IOS, android will always return granted
    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        PushNotifications.register();
      }
    });

    // Subsribe to topic if registration succeeded
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      fcm.subscribeTo({topic: 'psn'});
      console.log(token);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      // TODO: Handle subscription error
      console.log(error);
    });

    // Received while in foreground
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      this.openNotificationModal(notification);
    });

    // Received while in background
    PushNotifications.addListener('pushNotificationActionPerformed', (event: PushNotificationActionPerformed) => {
      this.openNotificationModal(event.notification);
    });
  }

  async openNotificationModal(notification: PushNotification) {
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
