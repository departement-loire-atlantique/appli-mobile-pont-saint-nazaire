
## 1. Change the app icon or Splashscreen 

Edit the `icon.png` or `splashscreen.png` files.

> For android : edit the android/icon-foreground.png file

## 2. Generate the assests

Run the following command:

```
cordova-res --icon-background-source "#99e6d1" --skip-config --copy
```

## Android

Android uses adaptive icons, which use a foreground and a background. Here we are only using the foreground and specifying a background color

See the doc for more infos : https://www.npmjs.com/package/cordova-res#adaptive-icons

## Documentation

- Adaptive icons : https://www.npmjs.com/package/cordova-res#adaptive-icons
- Use with Capacitor: https://www.npmjs.com/package/cordova-res#capacitor

Cordova reference documentation:

- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/