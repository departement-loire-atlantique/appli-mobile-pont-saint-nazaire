import { Injectable } from '@angular/core';
import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

import { FCM } from '@capacitor-community/fcm';
import { Platform, ModalController } from '@ionic/angular';
import { PushModalComponent } from '../components/push-modal/push-modal.component';
import { StorageService } from './storage.service';
const fcm = new FCM();

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public readonly STORAGEKEY = 'is-subscribed';

  constructor(private platform: Platform, private modalController: ModalController, private storageService: StorageService) { }

  subscribe() {
    console.log('Subscribe to notifications');
    if (!this.platform.is('capacitor')) {
      return;
    }

    fcm.subscribeTo({topic: 'psn'}).then(() => {
      this.storageService.set(this.STORAGEKEY, true);
    });
  }

  unsubscribe() {
    console.log('Unsubscribe from notifications');
    if (!this.platform.is('capacitor')) {
      return;
    }

    fcm.unsubscribeFrom({topic: 'psn'}).then(() => {
      this.storageService.set(this.STORAGEKEY, false);
    });
  }

  register() {
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
      this.subscribe();
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
