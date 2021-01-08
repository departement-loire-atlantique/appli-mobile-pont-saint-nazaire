import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState, NetworkStatus, SplashScreen } from '@capacitor/core';
import { Plugins } from '@capacitor/core';
import { IonRouterOutlet, LoadingController, MenuController, ModalController, Platform } from '@ionic/angular';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { EVENTS_MOCK, PSN_STATUS } from 'src/app/models/constantesCD44';

import { environment } from '../../../environments/environment';
import { DetailspertubationComponent } from '../../components/detailspertubation/detailspertubation.component';
import { ApiEvent, Event } from '../../models/event';
import { Status } from '../../models/status';
import { ApiService } from '../../services/api.service';
import { UtilsService } from '../../services/utils.service';
import { FilterByPropertyPipe } from '../../shared/filter-by-property.pipe';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public status: Status;
  public eventsList: Event[] = [];
  public currentEvents: Event[] = [];
  public upcomingEvents: Event[] = [];

  public isFirstCall = true;
  public isFetching = true;
  public hasError = false;

  private bottomPanel: CupertinoPane;

  private subs = [];

  constructor(
    private platform: Platform,
    private api: ApiService,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController,
    private menuController: MenuController,
    private filterPipe: FilterByPropertyPipe,
    private loadingController: LoadingController
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  ngOnInit() {
    this.addAppStateChangeSubscription();
  }

  ionViewWillEnter() {
    this.getData();
  }

  /**
   * Init cupertino pane (bottom panel)
   */
  setupBottomPanel() {
    const bottomSafeArea: string = getComputedStyle(document.documentElement).getPropertyValue('--ion-safe-area-bottom');

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
          height: 40 + parseInt(bottomSafeArea, 10),
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
  async getData(event?: any) {
    this.isFetching = true;
    this.hasError = false;

    let loader: HTMLIonLoadingElement;
    let diversionEvent: ApiEvent;

    if (this.bottomPanel && !event) {
      const currentPanelPosition = this.bottomPanel.currentBreak();

      if (currentPanelPosition === 'bottom') {
        loader = await this.loadingController.create({ message: 'Chargement ...' });
        await loader.present();
      }
    }

    const useMocks = !environment.production;

    try {
      const status = await this.api.getPSNStatus();
      this.status = this.utils.formatStatus(useMocks ? PSN_STATUS : status);
      this.status.from = new Date();

    } catch (error) {
      this.hasError = true;
    }

    // Add fake diversion event in the north zone
    if (this.utils.isDeviation(this.status)) {
      diversionEvent = {
        nature: 'Deviation',
        longitude: '47.298',
        datePublication: new Date().toISOString()
      };
    }

    try {
      const events = await this.api.getEvents();

      if (this.utils.isDeviation(this.status)) {
        const now = new Date().toISOString();
        (useMocks ? EVENTS_MOCK : events).push({
          nature: 'Deviation',
          statut: 'en cours',
          longitude: '47.298',
          datePublication: now
        }, {
          nature: 'Deviation',
          statut: null,
          longitude: '47.268',
          datePublication: now
        });
      }

      this.eventsList = this.utils.getEventsList(useMocks ? EVENTS_MOCK : events);

      this.currentEvents = this.filterPipe.transform(this.eventsList, 'status', 'en cours');
      this.upcomingEvents = this.filterPipe.transform(this.eventsList, 'status', 'prévisionnel');
    } catch (error) {
      this.hasError = true;
    }

    if (this.isFirstCall) {
      SplashScreen.hide();
      this.isFirstCall = false;
      this.setupBottomPanel();
    }


    this.isFetching = false;

    if (loader) {
      loader.dismiss();
    }

    if (event) {
      event.target.complete();
    }
  }

  /**
   * Open the event detail modal
   * @param event an event
   */
  async openEventDetail(event: Event) {
    const modal = await this.modalController.create({
      component: DetailspertubationComponent,
      componentProps: { event, status: this.status },
      cssClass: 'event-modal'
    });
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
