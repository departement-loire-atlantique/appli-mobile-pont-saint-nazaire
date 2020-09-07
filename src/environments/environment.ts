// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.loire-atlantique.fr/opendata/1.0',
  firebaseConfig: {
    apiKey: 'AIzaSyCU60VPBHF0uM32DSvVzxMjsDo0l8L097M',
    authDomain: 'hybride-pont-de-saint-nazaire.firebaseapp.com',
    databaseURL: 'https://hybride-pont-de-saint-nazaire.firebaseio.com',
    projectId: 'hybride-pont-de-saint-nazaire',
    storageBucket: 'hybride-pont-de-saint-nazaire.appspot.com',
    messagingSenderId: '164961539837',
    appId: '1:164961539837:web:cb2bbe3c47a25bf41a9094',
    measurementId: 'G-2PGV24S87K'
  },
  webcamUpdateInterval: 5000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
