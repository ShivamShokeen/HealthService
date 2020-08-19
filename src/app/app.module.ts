import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninDetailsService } from './signin/signin-details.service';
import { HospitalDetailsService } from './home/hospital-details.service';

// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';
import { HomePage } from './home/home.page';
import { HomePageModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:
    [      
      CalendarModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HomePageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    SigninDetailsService,
    HospitalDetailsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
