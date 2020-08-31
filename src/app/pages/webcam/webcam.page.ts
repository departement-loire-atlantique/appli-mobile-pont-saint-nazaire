import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.page.html',
  styleUrls: ['./webcam.page.scss'],
})
export class WebcamPage implements OnInit, OnDestroy {

  public image: any;
  private interval: any;

  constructor(private modalController: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.getWebcam();

    this.interval = setInterval(() => {
      this.getWebcam();
    }, 5000);
  }

  getWebcam() {
    this.api.getLatestWebcam().then(image => {
      if (image) {
        this.image = image;
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
