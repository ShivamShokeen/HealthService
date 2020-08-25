import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { UserCredentialsService } from '../services/user-credentials.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  userDetails = {
    uid: "",
    username: "",
    country: "",
    city: "",
    district: "",
    zipcode: "",
    phone: "",
    emailid: "",
    password: "",
    address: "",
    type: "enduser"
  }

  hospitalDetails = {
    uid: "",
    name: "",
    image: "",
    country: "",
    city: "",
    specialize: "",
    insuranceSupport: "",
    zipcode: "",
    registrationNumber: "",
    phone: "",
    emailid: "",
    password: "",
    address: "",
    type: "hospital"
  }

  type;
  clearErrorMessage = true;
  constructor(private router: Router, public route: ActivatedRoute, public toastController: ToastController, private http: HttpClient, public userCredentials: UserCredentialsService) { }

  ngOnInit() {
    this.type = this.route.snapshot.params['type'];
  }

  signin(email, password) {
    if (this.clearErrorMessage == true && email.value != "" || email.value != undefined && password.value != "" || password.value != undefined) {
      this.waitMessage();
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            this.userCredentials.UID = userLogginDetails.uid;
            this.userCredentials.userName = userLogginDetails.displayName;
            this.userCredentials.getLogginUserDetails();
            this.router.navigate(['/home']);
          })
        .catch(error => {
          console.log(error);
          console.log(error.message);
          this.signupErrorMessage(error.message);
        })
    }
  }

  userSignup(form) {
    if (this.clearErrorMessage == true && form.valid) {
      this.type = 'signin';
      firebase.auth().createUserWithEmailAndPassword(form.value.email, form.value.pass)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            if (user) {
              userLogginDetails.updateProfile({
                displayName: this.userDetails.username
              });
            }
            this.userDetails.uid = userLogginDetails.uid;
            this.http.post('https://healthservice-97887.firebaseio.com/accounts.json', this.userDetails).subscribe(responseData => {
            });
          }
        )
        .catch(error => {
          console.log(error);
          this.signupErrorMessage(error.message);
        })
      this.signupSuccessMessage();
      this.router.navigate(['/signin/signin']);
    }
    else {
      this.emptyMessage();
    }
  }
  hospitalSignup(doctorForm) {
    if (this.clearErrorMessage == true && doctorForm.valid) {
      this.type = 'signin';
      firebase.auth().createUserWithEmailAndPassword(doctorForm.value.email, doctorForm.value.pass)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            if (user) {
              userLogginDetails.updateProfile({
                displayName: this.hospitalDetails.name
              });
            }
            this.hospitalDetails.uid = userLogginDetails.uid;
            this.http.post('https://healthservice-97887.firebaseio.com/accounts.json', this.hospitalDetails).subscribe(responseData => {
            });
          }
        )
        .catch(error => {
          console.log(error);
          this.signupErrorMessage(error.message);
        })
      this.signupSuccessMessage();
      this.router.navigate(['/signin/signin']);
    }
    else {
      this.emptyMessage();
    }
  }

  reset() {
    this.clearErrorMessage = false;
  }

  async signupErrorMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async signupSuccessMessage() {
    const toast = await this.toastController.create({
      message: 'Transfering to Signin/Login :)',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  async emptyMessage() {
    const toast = await this.toastController.create({
      message: 'Field are empty.',
      duration: 5000,
      color: "danger"
    });
    toast.present();
  }

  async waitMessage() {
    const toast = await this.toastController.create({
      message: 'Please wait for few seconds :) .',
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }
}
