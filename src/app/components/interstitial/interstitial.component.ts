import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-interstitial',
  templateUrl: './interstitial.component.html',
  styleUrls: ['./interstitial.component.scss'],
})
export class InterstitialComponent implements OnInit {

  public data: any;
  public timeout: any;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.data.type == 'interstitial') {
      this.timeout = setTimeout(this.close.bind(this), this.data.duration);
    }
    
  }

  close() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.modalController.dismiss();
  }

}
