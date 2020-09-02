import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData, CommonModule } from '@angular/common';
import { PushModalComponent } from './components/push-modal/push-modal.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, PushModalComponent],
  entryComponents: [
    PushModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
