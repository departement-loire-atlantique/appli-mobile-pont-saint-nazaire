import { Injectable } from '@angular/core';
import '@capacitor-community/firebase-analytics';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

const { FirebaseCrashlytics, FirebaseAnalytics } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private platform: Platform) { }

  enableCrashlytics() {
    if (this.platform.is('capacitor')) {
      FirebaseCrashlytics.setEnabled({
        enabled: true
      });
    }
  }

  enableAnalytics() {
    FirebaseAnalytics.setCollectionEnabled({
      enabled: true
    });
  }

}
