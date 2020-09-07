import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../../services/notifications.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  public isSubscribed: boolean;

  constructor(private storageService: StorageService, private notificationService: NotificationsService) { }

  ngOnInit() {
    this.storageService.get(this.notificationService.STORAGEKEY).then((value: boolean) => {
      this.isSubscribed = value;
    });
  }

  changeSubscription() {
    if (this.isSubscribed) {
      this.notificationService.subscribe();
    } else {
      this.notificationService.unsubscribe();
    }
  }

}
