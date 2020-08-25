import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { UserCredentialsService } from './services/user-credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public userCredential: UserCredentialsService,
    public router: Router,
    private toastController: ToastController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(environment.firebaseConfig);
  }

  userLogout() {
    firebase.auth().signOut().then(() => {
      this.userCredential.userName = "";
      this.userCredential.hospitalUID = "";
      this.userCredential.UID = "";
      this.userCredential.hospitalName = "";
      this.userCredential.hospitalId = "";
      this.logoutMessage();
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.log(error);
    });
  }

  async logoutMessage() {
    const toast = await this.toastController.create({
      message: 'You are successfully signout.',
      duration: 5000,
      position: 'middle',
      color: "primary"
    });
    toast.present();
  }
}
