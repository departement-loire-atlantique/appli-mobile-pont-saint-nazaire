import { Component, Input, OnDestroy } from '@angular/core';
import { MenuController, ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnDestroy {

  @Input() type: string;

  private backButtonEvent: any;

  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private menuController: MenuController,
    private platform: Platform
  ) {
    this.backButtonEvent = this.platform.backButton.subscribeWithPriority(10, () => this.goBack());
  }

  goBack() {
    switch (this.type) {
      case 'modal':
        this.modalController.dismiss();
        break;
      case 'menu':
        this.menuController.close();
        break;
      default:
        this.nav.back();
        break;
    }
  }

  ngOnDestroy() {
    this.backButtonEvent.unsubscribe();
  }
}
