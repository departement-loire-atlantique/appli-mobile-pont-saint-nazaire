import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

import { SocialNetwork } from './models/social-network';
import { AnalyticsService } from './services/analytics.service';
import { InterstitialService } from './services/interstitial.service';
import { NotificationsService } from './services/notifications.service';
import { RemoteConfigService } from './services/remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public socialNetworks: SocialNetwork[] = [];

  public pages: any = [
    {
      title: 'Webcam',
      url: '/webcam'
    },
    {
      title: 'Notifications',
      url: '/notifications'
    }
  ];

  constructor(
    private notificationService: NotificationsService,
    private remoteConfigService: RemoteConfigService,
    private router: Router,
    private platform: Platform,
    private analyticsService: AnalyticsService,
    private interstitialServive: InterstitialService
  ) {
    this.initializeApp();
  }

  /**
   * Setup the app by:
   *  - Going back to the root url
   *  - Checking notification permissions
   *  - getting remote content
   *  - enabling analytics
   */
  initializeApp() {
    this.platform.ready().then(async () => {

      // Always reset app navigation to root page
      this.router.navigateByUrl('/');

      // Setup notifications
      this.notificationService.setup();

      await this.getRemoteContent();

      // Enable analytics
      this.analyticsService.enableAnalytics();
      this.analyticsService.enableCrashlytics();

      this.interstitialServive.init();
    });
  }

  /**
   * Call Firebase remote-config to get social networks config and content pages
   */
  async getRemoteContent() {
    // Get remote config from firebase
    this.socialNetworks = await this.remoteConfigService.get('social_networks');
    const configPages = await this.remoteConfigService.get('pages');
    this.setPages(configPages);
  }

  /**
   * Add remote config pages in front of local pages
   * @param pages pages defined in firebase remote config
   */
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
}
