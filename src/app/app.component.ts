import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';

import { SocialNetwork } from './models/social-network';
import { NotificationsService } from './services/notifications.service';
import { RemoteConfigService } from './services/remote-config.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public socialNetworks: SocialNetwork[] = [];

  public pages: any = [
    {
      title: 'Notifications',
      url: '/notifications'
    }
  ];

  constructor(
    private notificationService: NotificationsService,
    private storageService: StorageService,
    private alertController: AlertController,
    private remoteConfigService: RemoteConfigService,
    private router: Router,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.router.navigateByUrl('/');

      this.storageService.get(this.notificationService.STORAGEKEY).then(value => {
        if (value) {
          this.notificationService.register();
        }
        if (value === null) {
          this.askForSubscription();
        }
      });

      this.socialNetworks = await this.remoteConfigService.get('social_networks');
      const configPages = await this.remoteConfigService.get('pages');

      const remotePages = configPages.map(page => {
        return {
          title: page.title,
          url: '/content-page',
          params: {
            id: page.id
          }
        };
      });

      this.pages = [...remotePages, ...this.pages];
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
          this.storageService.set(this.notificationService.STORAGEKEY, true);
          this.notificationService.register();
        }
      }]
    });
    return await askAlert.present();
  }
}
