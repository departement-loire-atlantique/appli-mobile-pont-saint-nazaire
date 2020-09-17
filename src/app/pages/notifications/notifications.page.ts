import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../../services/notifications.service';
<<<<<<< HEAD
import { ErrorService } from 'src/app/services/error.service';
import { langFr } from 'src/app/models/constantesCD44';
=======
import { StorageService } from '../../services/storage.service';
>>>>>>> 5da1e8a8bbbf85b728ca244f4e0e87189cd8c091

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public isSubscribed: boolean;

  constructor(private storageService: StorageService,
              private notificationService: NotificationsService,
              private erroService: ErrorService) { }

  ngOnInit() {
    this.storageService.get(this.notificationService.STORAGEKEY).then((value: boolean) => {
      this.isSubscribed = value;
    }).catch(err => this.erroService.openModalError(langFr.error.titleNotif, langFr.error.bodyNotif));
  }

  changeSubscription() {
    if (this.isSubscribed) {
      this.notificationService.subscribe();
    } else {
      this.notificationService.unsubscribe();
    }
  }

}
