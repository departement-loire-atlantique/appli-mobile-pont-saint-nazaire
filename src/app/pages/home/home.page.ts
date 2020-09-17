import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState, NetworkStatus, SplashScreen } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, MenuController, ModalController, Platform } from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';

import { environment } from '../../../environments/environment';
import { DetailspertubationComponent } from '../../components/detailspertubation/detailspertubation.component';
import { Event } from '../../models/event';
import { ApiService } from '../../services/api.service';
import { UtilsService } from '../../services/utils.service';
import { FilterByPropertyPipe } from '../../shared/filter-by-property.pipe';
const { App, AdMob } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public status: any;
  public eventsList: Event[] = [];
  public currentEvents: Event[] = [];
  public upcomingEvents: Event[] = [];

  public isFirstCall = true;

  private bottomPanel: CupertinoPane;

  private subs = [];

  constructor(
    private platform: Platform,
    private api: ApiService,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private menuController: MenuController,
    private filterPipe: FilterByPropertyPipe) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });

    this.showInterstitial();
  }

  ngOnInit() {
    this.addAppStateChangeSubscription();
    this.setupBottomPanel();
  }

  ionViewWillEnter() {
    this.getData();
  }

  showInterstitial() {
    if (this.platform.is('capacitor')) {
      AdMob.prepareInterstitial({
        adId: this.platform.is('ios') ? environment.adMobId.ios : environment.adMobId.android,
        autoshow: true
      });

      AdMob.addListener('onAdLoaded', () => {
        AdMob.showInterstitial();
      });

      AdMob.addListener('onAdFailedToLoad', (info: boolean) => {
        console.log(info);
      });
    }
  }

  /**
   * Init cupertino pane (bottom panel)
   */
  setupBottomPanel() {
    const panelSettings: CupertinoSettings = {
      initialBreak: 'bottom',
      buttonClose: false,
      topperOverflow: true,
      bottomOffset: 0,
      // touchAngle: 45,
      parentElement: 'app-home',
      passiveListeners: false,
      breaks: {
        bottom: {
          enabled: true,
          height: 40,
        },
        top: {
          enabled: true,
          height: window.innerHeight - 56,
        },
      },
    };

    this.bottomPanel = new CupertinoPane('.cupertino-pane', panelSettings);
    this.bottomPanel.present({ animate: true });
  }

  /**
   * Subscribes to AppStateChange & networkStatusChange events to update data
   */
  addAppStateChangeSubscription() {
    this.subs.push(
      this.utils.appStateChangeDetector().subscribe((state: AppState) => {
        if (state.isActive) {
          this.getData();
        }
      })
    );

    this.subs.push(
      this.utils.networkChangeDetector().subscribe((status: NetworkStatus) => {
        if (status.connected) {
          this.getData();
        }
      })
    );
  }

  /**
   * Calls the API to retrieve the current status and events
   */
  async getData() {
    const status = await this.api.getPSNStatus();
    this.status = this.utils.formatStatus(status);
    this.status.from = new Date();

    this.eventsList = await this.api.getEvents();

    // TODO: remove for prod
    // this.eventsList = this.utils.generateRandomEvent();

    this.eventsList = this.utils.getEventsList();
    this.currentEvents = this.filterPipe.transform(this.eventsList, 'status', 'en cours');
    this.upcomingEvents = this.filterPipe.transform(this.eventsList, 'status', 'prévisionnel');

    if (this.isFirstCall) {
      SplashScreen.hide();
      this.isFirstCall = false;
    }
  }

  /**
   * Open the event detail modal
   * @param event an event
   */
  async openEventDetail(event: Event) {
    const modal = await this.modalController.create({
      component: DetailspertubationComponent,
      componentProps: { event },
      cssClass: 'event-modal'
    });
    modal.onDidDismiss().then(() => this.getData());
    return await modal.present();
  }

  /**
   * Close the bottom panel or exit the app on back button press
   */
  handleBackButton() {
    const currentPanelPosition = this.bottomPanel.currentBreak();

    if (currentPanelPosition !== 'bottom') {
      this.bottomPanel.moveToBreak('bottom');
    } else {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    }
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
