import { Injectable } from '@angular/core';
import { FCM } from '@capacitor-community/fcm';
import { Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken } from '@capacitor/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';

import { PushModalComponent } from '../components/push-modal/push-modal.component';
import { CG44Notification } from '../models/notification';

import { StorageService } from './storage.service';

const { PushNotifications } = Plugins;
const fcm = new FCM();

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public readonly STORAGEKEY = 'is-subscribed';

  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private storageService: StorageService,
    private alertController: AlertController
  ) { }

  /**
   * Check that we've asked the user for notifications display
   */
  async setup() {
    // Check if notification agreement has been asked
    const stored = await this.storageService.get(this.STORAGEKEY);

    if (stored) {
      this.register();
    }
    if (stored === null) {
      this.askForSubscription();
    }
  }

  /**
   * Open an alert that ask the user if they want to subscribe to push notifications
   */
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
          this.storageService.set(this.STORAGEKEY, true);
          this.register();
        }
      }]
    });
    return await askAlert.present();
  }

  /**
   * Subscribes to push notification in the "psn" topic
   */
  subscribe() {
    console.log('Subscribe to notifications');
    if (!this.platform.is('capacitor')) {
      return;
    }

    fcm.subscribeTo({ topic: 'psn' }).then(() => {
      this.storageService.set(this.STORAGEKEY, true);
    });
  }

  /**
   * Unsubscribes for the "psn" topic
   */
  unsubscribe() {
    console.log('Unsubscribe from notifications');
    if (!this.platform.is('capacitor')) {
      return;
    }

    fcm.unsubscribeFrom({ topic: 'psn' }).then(() => {
      this.storageService.set(this.STORAGEKEY, false);
    });
  }

  /**
   * Subscribes to push notifications
   */
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

  /**
   * Opens the notification detail modal
   * @param notification notification received from firebase
   */
  async openNotificationModal(notification: CG44Notification) {
    const current = await this.modalController.getTop();
    if (current) {
      await current.dismiss();
    }
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
