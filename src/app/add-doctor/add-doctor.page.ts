import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { UserCredentialsService } from '../services/user-credentials.service';
import { HospitalDetailsService } from '../services/hospital-details.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.page.html',
  styleUrls: ['./add-doctor.page.scss'],
})
export class AddDoctorPage implements OnInit {

  doctorDetails = {
    createdByName: this.userCredentials.userName,
    hospitalId: this.userCredentials.hospitalId,
    hospitalName: this.userCredentials.hospitalName,
    name: "",
    image: "",
    country: "",
    city: "",
    specialize: "",
    zipcode: "",
    fees: "",
    languagesSpoken: "",
    timing: "",
    workingShift: "",
    workingDay: "",
    appointmentSlots: "",
    facilities: "",
    registrationNumber: "",
    phone: "",
    emailid: "",
    password: "",
    address: "",
    experience: "",
    degree: ""
  }

  clearErrorMessage = true;
  urlParameter: any;
  editDoctorDetails: any;

  constructor(private router: Router, public route: ActivatedRoute, public toastController: ToastController, private http: HttpClient, public userCredentials: UserCredentialsService, public hospitalDetails: HospitalDetailsService) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/home']);
    }
    this.urlParameter = this.route.snapshot.params['for'];
    let filterCondition: any;
    let referance;
    let duplicateData = [];
    let removeDup: any;
    referance = firebase.database().ref('/doctors').on("value", (snapshot) => {
      for (const key in snapshot.val()) {
        if (snapshot.val().hasOwnProperty(key)) {
          filterCondition = { ...snapshot.val()[key], id: key };
          duplicateData.push(filterCondition);
          removeDup = duplicateData.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
          this.hospitalDetails.doctorDetails = removeDup;
          this.editDoctorDetails = removeDup.filter((value) => value.hospitalId == this.userCredentials.hospitalId)
        }
      }
    });
    // if (this.editDoctorDetails.length == 0) {
    //   this.router.navigate(['add-doctor/add']);
    // }
  }

  ngOnInit() {
  }

  hospitalSignup(doctorForm) {
    if (doctorForm.valid) {
      let patientAccountDetails;
      patientAccountDetails = {
        onTheBehalfOfHospital: this.userCredentials.hospitalName,
        hospitalId: this.userCredentials.hospitalId,
        username: this.doctorDetails.name,
        country: this.doctorDetails.country,
        city: this.doctorDetails.city,
        zipcode: this.doctorDetails.zipcode,
        phone: this.doctorDetails.phone,
        emailid: this.doctorDetails.emailid,
        password: this.doctorDetails.password,
        address: this.doctorDetails.address,
        disable: "none"
      }
      firebase.auth().createUserWithEmailAndPassword(doctorForm.value.email, doctorForm.value.pass)
        .then(
          (user) => {
            let userLogginDetails = firebase.auth().currentUser;
            if (user) {
              userLogginDetails.updateProfile({
                displayName: this.doctorDetails.name
              });
              this.http.post('https://healthservice-97887.firebaseio.com/accounts.json', patientAccountDetails).subscribe(responseData => {
                this.http.post('https://healthservice-97887.firebaseio.com/doctors.json', this.doctorDetails).subscribe(data => {
                  this.addedSuccessfully();
                })
              },error =>{
                if(error.status == 401){
                  this.errorMessage();
                }
              });
              // this.router.navigate(['/home']);
            }
          }
        )
        .catch(error => {
          console.log(error);
          this.signupErrorMessage(error.message);
        })
    }
    else {
      this.emptyMessage();
    }
  }

  resetForm() {
    this.doctorDetails = {
      createdByName: this.userCredentials.userName,
      hospitalId: this.userCredentials.hospitalId,
      hospitalName: this.userCredentials.hospitalName,
      name: "",
      image: "",
      country: "",
      city: "",
      specialize: "",
      zipcode: "",
      fees: "",
      languagesSpoken: "",
      timing: "",
      workingShift: "",
      workingDay: "",
      appointmentSlots: "",
      facilities: "",
      registrationNumber: "",
      phone: "",
      emailid: "",
      password: "",
      address: "",
      experience: "",
      degree: ""
    }
  }

  deleteDoctor(id) {
    this.errorMessage();
    // let specificUrl: string;
    // specificUrl = 'https://healthservice-97887.firebaseio.com/doctors/' + id + '.json';
    // this.http.delete(specificUrl).subscribe(data => { });
    // this.deletedSuccessfully();
    // this.router.navigate(['/home']);
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

  async noDoctor() {
    const toast = await this.toastController.create({
      message: "No doctor is created.Shifting to add doctor page",
      duration: 4000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async addedSuccessfully() {
    const toast = await this.toastController.create({
      message: 'Added successfully :)',
      duration: 3000,
      position: "middle",
      color: "primary"
    });
    toast.present();
  }

  async deletedSuccessfully() {
    const toast = await this.toastController.create({
      message: 'Deleted successfully :)',
      duration: 3000,
      position: "middle",
      color: "primary"
    });
    toast.present();
  }

  async emptyMessage() {
    const toast = await this.toastController.create({
      message: 'Field are empty.',
      duration: 5000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async errorMessage() {
    const toast = await this.toastController.create({
      message: "You need to create your own firebase account and you can take help of 'Step video' that is available on my app 'BuildX Projects'.",
      duration: 4000,
      position: "bottom",
      color: "danger"
    });
    toast.present();
  }


}
