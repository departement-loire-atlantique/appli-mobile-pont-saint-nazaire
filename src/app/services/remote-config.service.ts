import { Injectable } from '@angular/core';
import '@capacitor-community/firebase-remote-config';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';

import { environment } from '../../environments/environment';

const { FirebaseRemoteConfig } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {

  public isInitialized = false;

  constructor(private platform: Platform) { }

  async setWebConfig() {
    console.log('Setup Firebase Remote Config');
    return await FirebaseRemoteConfig.initializeFirebase(environment.firebaseConfig);
  }

  /**
   * Check if the firebase plugin is up and ready
   */
  async checkInitialization() {
    if (!this.isInitialized) {
      if (!this.platform.is('capacitor')) {
        await this.setWebConfig();
      }

      FirebaseRemoteConfig.initialize({
        minimumFetchIntervalInSeconds: 3600
      });
      await FirebaseRemoteConfig.fetchAndActivate();

      this.isInitialized = true;
      return 'needed initialization';
    }
    return 'already initialized';
  }

  /**
   * Fetch a remote config given a key
   * @param key Remote config entry key
   */
  async get(key: string) {
    await this.checkInitialization();

    const response = await FirebaseRemoteConfig.getString({
      key
    });

    if (response) {
      return JSON.parse(this.platform.is('capacitor') ? response.value : response);
    }

    return false;
  }

}
