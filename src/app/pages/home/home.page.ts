import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { UtilsService } from '../../services/utils.service';
import { AppState } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { WebcamPage } from '../webcam/webcam.page';

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

  constructor(private api: ApiService, private utils: UtilsService, private modalController: ModalController) { }

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

    const bottomPanel = new CupertinoPane('.cupertino-pane', panelSettings);

    bottomPanel.present({ animate: true });
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

    this.eventsList = await this.api.getEvents();
  }

  async openWebcam() {
    const modal = await this.modalController.create({
      component: WebcamPage,
      cssClass: 'webcam-page'
    });
    modal.onDidDismiss().then(() => this.getData());
    return await modal.present();
  }

  ngOnDestroy() {
    this.stateSub.unsubscribe();
  }

}
