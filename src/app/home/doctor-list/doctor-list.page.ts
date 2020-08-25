import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalDetailsService } from '../../services/hospital-details.service';
import { ToastController } from '@ionic/angular';
import { UserCredentialsService } from 'src/app/services/user-credentials.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.page.html',
  styleUrls: ['./doctor-list.page.scss'],
})
export class DoctorListPage implements OnInit {

  urlParameter: number;
  hospitalName: string;
  getDoctor;
  searchTerm: string = "";
  doctorDetails: any;
  emptyData: any;
  constructor(private router: Router, private route: ActivatedRoute, public hospitalService: HospitalDetailsService, public toastController: ToastController, public userCredentials: UserCredentialsService) { }

  ngOnInit() {
    this.urlParameter = this.route.snapshot.params['id'];
    this.hospitalName = this.route.snapshot.params['name'];
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
          this.hospitalService.doctorDetails = removeDup;
          this.setFilteredItems();
        }
      }
    });

  }

  setFilteredItems() {
    this.doctorDetails = this.hospitalService.doctorSearch(this.searchTerm, this.urlParameter);
    this.emptyData = this.doctorDetails;
    console.log(this.emptyData)
    // if (this.emptyData.length == 0) {
    //   this.noDoctorMessage;
    //   this.router.navigate(['/home']);
    // }
  }

  bookAppointment(doctorId, hospitalId, image, phone, fees) {
    if (!this.userCredentials.UID) {
      this.router.navigate(['/signin/signin']);
      this.notLoginMessage();
    }
    else {
      this.router.navigate(['/appointment/add'], { queryParams: { doctorId: doctorId, hospitalId: hospitalId, image: image, doctorPhone: phone, doctorFees: fees } });
    }
  }

  async noDoctorMessage() {
    const toast = await this.toastController.create({
      message: 'No doctor are available.',
      position: "middle",
      duration: 2000
    });
    toast.present();
  }


  async shiftingMessage() {
    const toast = await this.toastController.create({
      message: "No doctor is created.Shifting to add doctor page",
      duration: 4000,
      position: "middle",
      color: "danger"
    });
    toast.present();
  }

  async notLoginMessage() {
    const toast = await this.toastController.create({
      message: 'You are not loggedin.',
      position: "middle",
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

}
