import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.page.html',
  styleUrls: ['./webcam.page.scss'],
})
export class WebcamPage implements OnInit, OnDestroy {

  public image: any;
  public date: Date;
  public updateInterval: any;

  constructor(private modalController: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.setUpdateInterval();
    this.getWebcam();
  }

  setUpdateInterval() {
    this.updateInterval = setInterval(() => {
      this.getWebcam();
    }, environment.webcamUpdateInterval);
  }

  getWebcam() {
    this.api.getLatestWebcam().then(image => {
      this.date = new Date();

      if (image) {
        this.image = image;
      }
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }
}
