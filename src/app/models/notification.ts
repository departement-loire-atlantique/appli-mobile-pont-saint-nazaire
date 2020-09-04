import { PushNotification } from '@capacitor/core';

export interface CG44Notification extends PushNotification {
  data: {
    title: string,
    body: string,
    type: string,
    linkUrl: string,
    linkTitle: string
  };
}
