import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins, PushNotificationToken, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
const { PushNotifications } = Plugins;

import { FCM } from '@capacitor-community/fcm';
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

  constructor(private platform: Platform) {}

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

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log(token);

        fcm.getToken().then(t => console.log(t));
        // alert('Push registration success, token: ' + token.value);
      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log(error);

        // alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
}
