export const environment = {
  production: true,
  apiUrl: 'https://api.loire-atlantique.fr/opendata/1.0',
  interstitialUrl: 'http://api.loire-atlantique.fr/bacspsn_android/1.0/traficparameter?id=mobile_intersticiel&format=json',
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
  deviationUrl: {
    m120: 'https://inforoutes.loire-atlantique.fr/deviation-m120-app',
    m012: 'https://inforoutes.loire-atlantique.fr/deviation-m012-app'
  },
  webcamUpdateInterval: 5000
};
