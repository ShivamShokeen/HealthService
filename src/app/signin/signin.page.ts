import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SigninDetailsService } from './signin-details.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  userDetails =  {
    username: "",
    country: "",
    city: "",
    district: "",
    zipcode: "",
    phone: "",
    emailid: "",
    password: "",
    address: ""
  }

  doctorDetails = {
    doctorName: "",
    country: "",
    city: "",
    district: "",
    zipcode: "",
    registrationNumber: "",
    degree: "",
    experience: "",
    services: "",
    offer: "",
    fee: "",
    workingDay: "",
    workingShift: "",
    phone: "",
    emailid: "",
    password: "",
    address: ""
  }

  type;
  clearErrorMessage = true;
  constructor(private router: Router, public route: ActivatedRoute, public toastController: ToastController, private signinService: SigninDetailsService) { }

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
  }

  signin(email, password) {
    if (this.clearErrorMessage == true && email != "" || email != undefined && password != "" || password != undefined) {
      this.signinService.signinVerification(email.value, password.value);
    }
  }

  signup(Formvalue) {
    if (this.clearErrorMessage == true && Formvalue.valid) {
      console.log(Formvalue.value);
      this.signinService.userDetails.push(this.userDetails);
      this.type = 'signin';
    }
    else {
      this.emptyMessage();
    }
  }
  doctorSignup(doctorForm) {
    if (this.clearErrorMessage == true && doctorForm.valid) {
      console.log(doctorForm.value);
      this.signinService.doctorDetails.push(this.doctorDetails);
      this.type = 'signin';
    }
    else {
      this.emptyMessage();
    }
  }

  reset() {
    this.clearErrorMessage = false;
    console.log("reseted");
  }

  async emptyMessage() {
    const toast = await this.toastController.create({
      message: 'Field are empty.',
      duration: 5000
    });
    toast.present();
  }
}
