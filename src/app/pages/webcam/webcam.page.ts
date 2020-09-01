import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.page.html',
  styleUrls: ['./webcam.page.scss'],
})
export class WebcamPage implements OnInit {

  public image: any;
  public date: Date;

  constructor(private modalController: ModalController, private api: ApiService) { }

  ngOnInit() {
    this.getWebcam();
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

}
