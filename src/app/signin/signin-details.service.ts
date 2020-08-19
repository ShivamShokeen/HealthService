import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SigninDetailsService {

  userDetails = [];
  doctorDetails = [];

  constructor(private toastController: ToastController) {
    if (this.userDetails.length > 0 || this.doctorDetails.length > 0) {
      console.log(this.userDetails);
      console.log(this.doctorDetails);
    }
  }

  signinVerification(email, password) {
    console.log(email)
    let verify;
    console.log(this.userDetails);
    console.log(this.doctorDetails);
    verify = this.userDetails.filter((value) => password == value.password);
    // verify = this.doctorDetails.filter((value) => value.emailid == email && value.password == password);
    console.log(verify)
    console.log(verify);
    if (verify.length > 0) {
      console.log(verify);
      this.successMessaage();
    }
  }

  async successMessaage() {
    const toast = await this.toastController.create({
      message: 'Signin successfully.',
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
