import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { UtilsService } from '../../services/utils.service';
import { AppState, SplashScreen } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { ModalController, Platform, IonRouterOutlet } from '@ionic/angular';
import { WebcamPage } from '../webcam/webcam.page';

import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public count = 0;
  public status: any;
  public eventsList: any;
  public stateSub: Subscription;

  public currentMode = 'm112';
  public north = 'vert';
  public south = 'vert';
  public isFirstCall = true;

  private bottomPanel: CupertinoPane;

  constructor(
    private platform: Platform,
    private api: ApiService,
    private utils: UtilsService,
    private routerOutlet: IonRouterOutlet,
    private modalController: ModalController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.handleBackButton();
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.count = this.count + 1;
    }, 1000);

    this.addAppStateChangeSubscription();

    const panelSettings: CupertinoSettings = {
      initialBreak: 'bottom',
      buttonClose: false,
      topperOverflow: true,
      bottomOffset: 0,
      parentElement: 'app-home',
      breaks: {
        bottom: {
          enabled: true,
          height: 40
        },
        top: {
          enabled: true,
          height: window.innerHeight - 56
        }
      }
    };

    this.bottomPanel = new CupertinoPane('.cupertino-pane', panelSettings);

    this.bottomPanel.present({ animate: true });
  }

  ionViewWillEnter() {
    this.getData();
  }

  addAppStateChangeSubscription() {
    this.stateSub = this.utils.appStateChangeDetector().subscribe((state: AppState) => {
      if (state.isActive) {
        this.getData();
      }
    });
  }

  async getData() {
    const status = await this.api.getPSNStatus();
    this.status = this.utils.formatStatus(status);
    this.status.from = new Date();

    this.eventsList = await this.api.getEvents();

    if (this.isFirstCall) {
      SplashScreen.hide();
      this.isFirstCall = false;
    }
  }

  async openWebcam() {
    const modal = await this.modalController.create({
      component: WebcamPage,
      cssClass: 'webcam-page'
    });
    modal.onDidDismiss().then(() => this.getData());
    return await modal.present();
  }

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

  ngOnDestroy() {
    this.stateSub.unsubscribe();
  }

}
