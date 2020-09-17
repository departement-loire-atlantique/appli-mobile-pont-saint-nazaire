import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api.service';
import { ErrorService } from 'src/app/services/error.service';
import { langFr } from 'src/app/models/constantesCD44';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.page.html',
  styleUrls: ['./webcam.page.scss'],
})
export class WebcamPage implements OnInit, OnDestroy {

  public image: any;
  public date: Date;
  public updateInterval: any;

  constructor(private modalController: ModalController,
              private api: ApiService,
              private errorService: ErrorService) { }

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
    }).catch( err => this.errorService.openModalError(langFr.error.titleCamera, langFr.error.bodyCamera));
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }
}
