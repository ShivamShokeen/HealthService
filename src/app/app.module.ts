import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HospitalDetailsService } from './services/hospital-details.service';

// Calendar UI Module
import { CalendarModule } from 'ion2-calendar';
import { HomePage } from './home/home.page';
import { HomePageModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:
    [      
      CalendarModule,
      BrowserModule,      
      AngularFireModule.initializeApp(environment.firebaseConfig),
      IonicModule.forRoot(),
      AppRoutingModule,
      HomePageModule,
      HttpClientModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    HospitalDetailsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
