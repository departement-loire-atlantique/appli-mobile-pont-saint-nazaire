import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';

import { SocialNetwork } from './models/social-network';
import { AnalyticsService } from './services/analytics.service';
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
    private platform: Platform,
    private analyticsService: AnalyticsService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      // Always reset app navigation to root page
      this.router.navigateByUrl('/');

      // Check if notification agreement has been asked
      this.storageService.get(this.notificationService.STORAGEKEY).then(value => {
        if (value) {
          this.notificationService.register();
        }
        if (value === null) {
          this.askForSubscription();
        }
      });

      // Get remote config from firebase
      this.socialNetworks = await this.remoteConfigService.get('social_networks');
      const configPages = await this.remoteConfigService.get('pages');
      this.setPages(configPages);

      // Enable analytics
      this.analyticsService.enableAnalytics();
      this.analyticsService.enableCrashlytics();
    });
  }

  setPages(pages) {
    const remotePages = pages.map(page => {
      return {
        title: page.title,
        url: '/content-page',
        params: {
          id: page.id
        }
      };
    });

    this.pages = [...remotePages, ...this.pages];
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
