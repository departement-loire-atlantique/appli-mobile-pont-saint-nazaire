import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = null;

  public appPages = [
    {
      title: 'Informations',
      url: '/informations'
    },
    {
      title: 'Les autres applis',
      url: '/other-apps'
    },
    {
      title: 'Le département',
      url: '/departement'
    },
    {
      title: 'Notifications',
      url: '/notifications'
    }
  ];

  constructor(
    private notificationService: NotificationsService,
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.storageService.get(this.notificationService.STORAGEKEY).then(value => {
      if (value) {
        this.notificationService.register();
      }
      if (value === null) {
        this.askForSubscription();
      }
    });
  }

  async askForSubscription() {
    const askAlert = await this.alertController.create({
      header: 'Notifications',
      message: 'Souhaitez-vous activer les notifications ?',
      buttons: [{
        text: 'Non merci',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: () => {
          this.storageService.set(this.notificationService.STORAGEKEY, true);
          this.notificationService.register();
        }
      }]
    });
    return await askAlert.present();
  }
}
