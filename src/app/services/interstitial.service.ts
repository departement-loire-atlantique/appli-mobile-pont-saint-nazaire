import { Injectable } from '@angular/core';
import { AppState, Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';

import { InterstitialComponent } from '../components/interstitial/interstitial.component';
import { Interstitial } from '../models/interstitial';

import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class InterstitialService {

  private static readonly STORAGEKEY = 'interstitial_display_date';

  private interstitialData: Interstitial;

  constructor(private utils: UtilsService, private modalController: ModalController, private apiService: ApiService) { }

  init() {
    this.getInterstitial().then((interstitial) => {
      this.interstitialData = interstitial;

      this.setListener();
      this.checkThreshold();
    }).catch(() => {
      console.log('no interstitial');
    });
  }

  setListener() {
    this.utils.appStateChangeDetector().subscribe((state: AppState) => {
      if (state.isActive) {
        this.checkThreshold();
      }
    });
  }

  async checkThreshold() {
    const lastDisplayDate = await Storage.get({ key: InterstitialService.STORAGEKEY });

    const now = new Date().getTime();
    const then = new Date(JSON.parse(lastDisplayDate.value)).getTime();

    const differenceInMilliseconds = Math.abs(now - then);
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

    if (differenceInMinutes >= this.interstitialData.every) {
      this.showInterstitial();
    }
  }

  // Store in file
  async storeLastDisplayDate() {
    return await Storage.set({
      key: InterstitialService.STORAGEKEY,
      value: JSON.stringify(new Date())
    });
  }

  // Open Modal
  async showInterstitial() {
    this.storeLastDisplayDate();

    const modal = await this.modalController.create({
      component: InterstitialComponent,
      componentProps: {
        data: this.interstitialData
      }
    });

    modal.present();
  }

  // Api Call
  async getInterstitial() {
    const data = await this.apiService.getInterstitial();
    if (data && data.interstitials && data.interstitials.length) {
      const interstitial = data.interstitials.find(item => item.idapp === 'pontsaintnazaire');
      interstitial.every = parseInt(interstitial.every, 10);
      interstitial.duration = parseInt(interstitial.duration, 10);
      return interstitial;
    }
  }

}
