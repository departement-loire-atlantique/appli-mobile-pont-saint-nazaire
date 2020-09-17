import { Injectable } from '@angular/core';
import '@capacitor-community/http';
import { HttpDownloadFileResult } from '@capacitor-community/http';
import { FilesystemDirectory, Plugins } from '@capacitor/core';

import { environment } from '../../environments/environment';
import { ApiEvent } from '../models/event';
import { ApiStatus } from '../models/status';
const { Http, Filesystem } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {}

  async getPSNStatus(): Promise<ApiStatus> {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrl + '/psnstatus',
      params: {
        mode: 'no-cors'
      }
    });

    return response.data;
  }

  async getEvents(): Promise<ApiEvent[]> {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrl + '/traficevents?filter=Pont%20de%20Saint-Nazaire',
      params: {
        mode: 'no-cors'
      }
    });

    return response.data;
  }

  async getEvent(id: number): Promise<ApiEvent> {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrl + '/event/' + id,
      params: {
        mode: 'no-cors'
      }
    });

    return response.data;
  }

  async getLatestWebcam(): Promise<string> {
    const download: HttpDownloadFileResult = await Http.downloadFile({
      url: environment.apiUrl + '/webcam?id=psn',
      filePath: 'webcam.jpg',
      fileDirectory: FilesystemDirectory.Data
    });

    // On a device the file will be written and will return a path
    if (download.path) {
      // This will return a base64 !
      const read = await Filesystem.readFile({
        path: 'webcam.jpg',
        directory: FilesystemDirectory.Data
      });

      return 'data:image/jpg;base64,' + read.data;
    }

    // On desktop the function will return a blob
    if (download.blob) {
      let result = null;

      await new Promise((resolve, reject) => {
        if (download.blob) {
          const reader = new FileReader();
          reader.onload = () => {
            result = reader.result;
            resolve();
          };
          reader.readAsDataURL(download.blob);
        } else {
          reject();
        }
      });
      return result;
    }

    return;
  }
}
