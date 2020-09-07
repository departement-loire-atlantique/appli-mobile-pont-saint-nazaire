# Pont de Saint-Nazaire - Application Hybride Ionic/Capacitor

## Technical Environment

The app is made using :
- [Ionic](https://ionicframework.com/)
- [Angular](https://angular.io/)
- [Capacitor](https://capacitorjs.com/)

Data comes from 2 sources : 
- https://api.loire-atlantique.fr
- Firebase

## App structure

The app is made of 4(-ish) pages:
- Home : The map with the current status and events
- Webcam : Shows the latest webcam image 
- Notifications : Setting page to toggle push notifications
- Content page : Display any content page received from firebase

## Plugins

We use the core APIs from Capacitor along with:

- [@capacitor-community/fcm](https://github.com/capacitor-community/fcm)
- [@capacitor-community/firebase-analytics](https://github.com/capacitor-community/firebase-analytics)
- [@capacitor-community/firebase-crashlytics](https://github.com/capacitor-community/firebase-crashlytics)
- [@capacitor-community/firebase-remote-config](https://github.com/capacitor-community/firebase-remote-config)
- [@capacitor-community/http](https://github.com/capacitor-community/http)